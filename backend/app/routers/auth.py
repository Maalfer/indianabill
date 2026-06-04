"""
routers/auth.py — Endpoints de autenticación
"""

import secrets
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import timedelta
from ..database import get_db
from ..models.user import User, UserRole
from ..schemas.user import UserCreate, UserLogin, UserResponse, Token, VerificarRequest
from ..utils.security import verify_password, get_password_hash, create_access_token, verify_token
from ..config import settings
from ..services import email_service


def _enviar_verificacion(nombre: str, email: str, token: str):
    """Envía el email de verificación (best-effort)."""
    link = f"{settings.public_base_url.rstrip('/')}/verificar?token={token}"
    data = email_service.build_verification_email(nombre, link)
    email_service.send_email(email, nombre, data["subject"], data["html"])

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), 
                    db: Session = Depends(get_db)) -> User:
    """Dependency para obtener el usuario actual a partir del token"""
    token = credentials.credentials
    email = verify_token(token)
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Registrar un nuevo usuario"""
    # Verificar si el email ya existe
    existing_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )
    
    # Verificar si el username ya existe
    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre de usuario ya está en uso"
        )
    
    # Crear el nuevo usuario.
    # Solo se exige verificación por email si el envío de emails está configurado;
    # si no, el usuario queda verificado automáticamente para no bloquear el acceso.
    needs_verification = email_service.email_configured()
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password,
        role=user_data.role or UserRole.USER,  # Por defecto es USER si no se especifica
        verificado=not needs_verification,
        verification_token=(secrets.token_urlsafe(32) if needs_verification else None),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    if needs_verification and new_user.verification_token:
        background_tasks.add_task(
            _enviar_verificacion, new_user.username, new_user.email, new_user.verification_token
        )

    return new_user

@router.post("/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Iniciar sesión"""
    # Buscar usuario por email
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Crear token de acceso
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Obtener información del usuario actual"""
    return current_user


@router.post("/verificar")
def verificar_email(data: VerificarRequest, db: Session = Depends(get_db)):
    """Verifica el email de un usuario a partir del token recibido por correo."""
    if not data.token:
        raise HTTPException(status_code=400, detail="Token no válido")
    user = db.query(User).filter(User.verification_token == data.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Enlace de verificación no válido o ya usado")
    user.verificado = True
    user.verification_token = None
    db.commit()
    return {"ok": True, "message": "Email verificado correctamente"}


@router.post("/resend-verificacion")
def reenviar_verificacion(
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Reenvía el email de verificación al usuario autenticado."""
    if current_user.verificado:
        return {"ok": True, "already": True}
    if not email_service.email_configured():
        # Sin email configurado no se puede verificar; se marca verificado.
        current_user.verificado = True
        db.commit()
        return {"ok": True, "auto": True}
    if not current_user.verification_token:
        current_user.verification_token = secrets.token_urlsafe(32)
        db.commit()
    background_tasks.add_task(
        _enviar_verificacion, current_user.username, current_user.email, current_user.verification_token
    )
    return {"ok": True, "sent": True}

@router.post("/logout")
def logout():
    """Cerrar sesión (cliente debe eliminar el token)"""
    return {"message": "Sesión cerrada correctamente"}
