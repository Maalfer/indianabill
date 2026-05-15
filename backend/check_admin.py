#!/usr/bin/env python3
"""
check_admin.py - Script para verificar y recrear el usuario admin
"""

import sys
import os
import sqlite3
from pathlib import Path
from app.utils.security import get_password_hash, verify_password
from app.database import SessionLocal
from app.models.user import User, UserRole

def check_and_fix_admin():
    """Verificar y recrear el usuario admin si es necesario"""
    
    db = SessionLocal()
    
    try:
        # Buscar el usuario admin
        admin_user = db.query(User).filter(User.email == "admin_indiana@indianabill.com").first()
        
        if admin_user:
            print("🔍 Usuario admin encontrado:")
            print(f"   • ID: {admin_user.id}")
            print(f"   • Username: {admin_user.username}")
            print(f"   • Email: {admin_user.email}")
            print(f"   • Role: {admin_user.role.value}")
            print(f"   • Created: {admin_user.created_at}")
            
            # Verificar la contraseña
            is_valid = verify_password("admin123", admin_user.hashed_password)
            print(f"   • Contraseña válida: {'✅ Sí' if is_valid else '❌ No'}")
            
            if not is_valid:
                print("\n🔧 Corrigiendo contraseña...")
                admin_user.hashed_password = get_password_hash("admin123")
                db.commit()
                print("✅ Contraseña actualizada correctamente")
            
        else:
            print("❌ Usuario admin no encontrado")
            print("🔧 Creando usuario admin...")
            
            # Crear el usuario admin
            new_admin = User(
                username="admin_indiana",
                email="admin_indiana@indianabill.com",
                hashed_password=get_password_hash("admin123"),
                role=UserRole.ADMIN,
                description="Administrador principal del sistema"
            )
            
            db.add(new_admin)
            db.commit()
            db.refresh(new_admin)
            
            print("✅ Usuario admin creado:")
            print(f"   • Username: {new_admin.username}")
            print(f"   • Email: {new_admin.email}")
            print(f"   • Role: {new_admin.role.value}")
            print(f"   • Contraseña: admin123")
        
        # Verificar todos los usuarios
        print("\n📊 Todos los usuarios en la base de datos:")
        users = db.query(User).all()
        for user in users:
            is_admin = user.role == UserRole.ADMIN
            is_valid = verify_password("admin123", user.hashed_password) if is_admin else False
            print(f"   • {user.username} - {user.email} - {user.role.value} {'(✅)' if is_admin and is_valid else ''}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🔍 Script de Verificación de Admin - Indiana Bill")
    print("=" * 50)
    check_and_fix_admin()
    
    print("\n📝 Para probar:")
    print("   • Email: admin_indiana@indianabill.com")
    print("   • Contraseña: admin123")
    print("   • O usa: ejemplo@ejemplo.es / password123")
