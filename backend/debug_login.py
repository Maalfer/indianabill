#!/usr/bin/env python3
"""
debug_login.py - Script para depurar problemas de login
"""

import sys
import os
from app.database import SessionLocal
from app.models.user import User, UserRole
from app.utils.security import verify_password, get_password_hash

def debug_login():
    """Depurar el proceso de login"""
    
    db = SessionLocal()
    
    try:
        print("🔍 Depurando proceso de login...")
        print("=" * 50)
        
        # Lista de usuarios a probar
        test_users = [
            {"email": "admin_indiana@indianabill.com", "password": "admin123"},
            {"email": "carlos_admin@indianabill.com", "password": "admin456"},
            {"email": "ejemplo@ejemplo.es", "password": "password123"}
        ]
        
        for test_user in test_users:
            print(f"\n📧 Probando: {test_user['email']}")
            print(f"🔑 Contraseña: {test_user['password']}")
            
            # Buscar usuario por email (exactamente como hace el login)
            user = db.query(User).filter(User.email == test_user["email"]).first()
            
            if not user:
                print("   ❌ Usuario no encontrado en la base de datos")
                continue
            
            print(f"   ✅ Usuario encontrado:")
            print(f"      • ID: {user.id}")
            print(f"      • Username: {user.username}")
            print(f"      • Email: {user.email}")
            print(f"      • Role: {user.role.value}")
            print(f"      • Hash length: {len(user.hashed_password)}")
            print(f"      • Hash starts: {user.hashed_password[:20]}...")
            
            # Verificar contraseña (exactamente como hace el login)
            is_valid = verify_password(test_user["password"], user.hashed_password)
            print(f"   🔐 Verificación de contraseña: {'✅ Válida' if is_valid else '❌ Inválida'}")
            
            if is_valid:
                print(f"   🎉 ¡Login exitoso para {user.email}!")
            else:
                print(f"   ❌ Login fallido para {user.email}")
                
                # Probar recreando el hash para comparar
                new_hash = get_password_hash(test_user["password"])
                print(f"      • Nuevo hash: {new_hash[:20]}...")
                print(f"      • Hashes iguales: {new_hash == user.hashed_password}")
        
        print("\n📊 Todos los usuarios en la base de datos:")
        users = db.query(User).all()
        for user in users:
            print(f"   • {user.email} - {user.username} - {user.role.value}")
        
    except Exception as e:
        print(f"❌ Error durante depuración: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

def recreate_admin_users():
    """Recrear usuarios admin con contraseñas frescas"""
    
    db = SessionLocal()
    
    try:
        print("\n🔧 Recreando usuarios admin...")
        
        # Eliminar usuarios admin existentes
        admin_users = db.query(User).filter(User.role == UserRole.ADMIN).all()
        for admin in admin_users:
            print(f"   🗑️  Eliminando: {admin.email}")
            db.delete(admin)
        
        db.commit()
        
        # Crear usuarios admin nuevos
        new_admins = [
            {
                "username": "admin_indiana",
                "email": "admin_indiana@indianabill.com",
                "password": "admin123",
                "description": "Administrador principal"
            },
            {
                "username": "carlos_admin",
                "email": "carlos_admin@indianabill.com",
                "password": "admin456",
                "description": "Administrador secundario"
            }
        ]
        
        for admin_data in new_admins:
            new_admin = User(
                username=admin_data["username"],
                email=admin_data["email"],
                hashed_password=get_password_hash(admin_data["password"]),
                role=UserRole.ADMIN,
                description=admin_data["description"]
            )
            
            db.add(new_admin)
            print(f"   ✅ Creado: {admin_data['email']} / {admin_data['password']}")
        
        db.commit()
        print("\n🎉 Usuarios admin recreados exitosamente!")
        
    except Exception as e:
        print(f"❌ Error al recrear admins: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🐛 Script de Depuración de Login - Indiana Bill")
    print("=" * 60)
    
    if len(sys.argv) > 1 and sys.argv[1] == "recreate":
        recreate_admin_users()
    else:
        debug_login()
    
    print("\n📝 Comandos:")
    print("   python debug_login.py           - Depurar login actual")
    print("   python debug_login.py recreate   - Recrear usuarios admin")
