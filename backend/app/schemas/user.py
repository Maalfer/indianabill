"""
schemas/user.py — Esquemas Pydantic para validación de datos de usuario
"""

from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional, List
from datetime import datetime
from ..models.user import UserRole

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str
    role: Optional[UserRole] = UserRole.USER

    @model_validator(mode='after')
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError('Las contraseñas no coinciden')
        return self

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: UserRole
    description: Optional[str] = None
    verificado: bool = True
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class VerificarRequest(BaseModel):
    token: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    description: Optional[str] = None
    role: Optional[UserRole] = None

class PasswordUpdate(BaseModel):
    new_password: str

class AdminPasswordUpdate(BaseModel):
    new_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
