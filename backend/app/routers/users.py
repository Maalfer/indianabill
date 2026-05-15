"""
routers/users.py — Endpoints para gestión de usuarios
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from ..schemas.user import UserResponse, UserUpdate
from .auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.put("/profile", response_model=UserResponse)
def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Actualizar el perfil del usuario actual"""
    
    # Si se actualiza el username, verificar que no esté en uso
    if user_update.username:
        existing_user = db.query(User).filter(
            User.username == user_update.username,
            User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El nombre de usuario ya está en uso"
            )
        current_user.username = user_update.username
    
    # Actualizar descripción si se proporciona
    if user_update.description is not None:
        current_user.description = user_update.description
    
    db.commit()
    db.refresh(current_user)
    
    return current_user
