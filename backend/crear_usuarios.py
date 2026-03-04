#!/usr/bin/env python3
"""
crear_usuarios.py - Script para crear usuarios de prueba con diferentes roles
Ejecutar este script desde la raíz del backend para crear usuarios de prueba
"""

import sys
import os

# Añadir el directorio actual al path para poder importar los módulos de la app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import engine, SessionLocal
from app.models.user import User, UserRole
from app.utils.security import get_password_hash

def create_test_users():
    """Crear usuarios de prueba con diferentes roles"""
    
    # Crear sesión de base de datos
    db = SessionLocal()
    
    try:
        # Usuarios de prueba
        test_users = [
            {
                "username": "admin_indiana",
                "email": "admin@indianabill.com",
                "password": "admin123",
                "role": UserRole.ADMIN,
                "description": "Administrador principal del sistema"
            },
            {
                "username": "juan_usuario",
                "email": "juan@indianabill.com", 
                "password": "usuario123",
                "role": UserRole.USER,
                "description": "Usuario regular para pruebas"
            },
            {
                "username": "maria_test",
                "email": "maria@indianabill.com",
                "password": "test123",
                "role": UserRole.USER,
                "description": "Usuario de prueba adicional"
            },
            {
                "username": "carlos_admin",
                "email": "carlos@indianabill.com",
                "password": "admin456",
                "role": UserRole.ADMIN,
                "description": "Segundo administrador para pruebas"
            },
            {
                "username": "ana_cliente",
                "email": "ana@indianabill.com",
                "password": "cliente123",
                "role": UserRole.USER,
                "description": "Cliente de prueba"
            }
        ]
        
        print("🚀 Creando usuarios de prueba...")
        
        for user_data in test_users:
            # Verificar si el usuario ya existe
            existing_user = db.query(User).filter(User.email == user_data["email"]).first()
            if existing_user:
                print(f"⚠️  El usuario {user_data['email']} ya existe. Omitiendo...")
                continue
            
            # Crear nuevo usuario
            hashed_password = get_password_hash(user_data["password"])
            new_user = User(
                username=user_data["username"],
                email=user_data["email"],
                hashed_password=hashed_password,
                role=user_data["role"],
                description=user_data["description"]
            )
            
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            
            print(f"✅ Usuario creado: {new_user.username} ({new_user.email}) - Rol: {new_user.role.value}")
        
        print("\n📊 Resumen de usuarios creados:")
        all_users = db.query(User).all()
        for user in all_users:
            print(f"   • {user.username} - {user.email} - {user.role.value}")
        
        print(f"\n🎉 Total de usuarios en la base de datos: {len(all_users)}")
        
    except Exception as e:
        print(f"❌ Error al crear usuarios: {e}")
        db.rollback()
    finally:
        db.close()

def delete_all_users():
    """Eliminar todos los usuarios de la base de datos (útil para pruebas)"""
    
    db = SessionLocal()
    
    try:
        print("⚠️  ¿Estás seguro de que quieres eliminar todos los usuarios? (y/n)")
        confirm = input().lower()
        
        if confirm != 'y':
            print("❌ Operación cancelada")
            return
        
        # Eliminar todos los usuarios
        deleted_count = db.query(User).count()
        db.query(User).delete()
        db.commit()
        
        print(f"🗑️  Se eliminaron {deleted_count} usuarios de la base de datos")
        
    except Exception as e:
        print(f"❌ Error al eliminar usuarios: {e}")
        db.rollback()
    finally:
        db.close()

def show_users():
    """Mostrar todos los usuarios actuales"""
    
    db = SessionLocal()
    
    try:
        users = db.query(User).all()
        
        if not users:
            print("📭 No hay usuarios en la base de datos")
            return
        
        print("📋 Usuarios actuales:")
        print("-" * 80)
        print(f"{'ID':<5} {'Username':<20} {'Email':<25} {'Rol':<10} {'Descripción':<30}")
        print("-" * 80)
        
        for user in users:
            description = user.description[:27] + "..." if user.description and len(user.description) > 30 else (user.description or "")
            print(f"{user.id:<5} {user.username:<20} {user.email:<25} {user.role.value:<10} {description:<30}")
        
        print(f"\n📊 Total: {len(users)} usuarios")
        
    except Exception as e:
        print(f"❌ Error al mostrar usuarios: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print("🎯 Script de gestión de usuarios - Indiana Bill")
    print("=" * 50)
    
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "crear":
            create_test_users()
        elif command == "eliminar":
            delete_all_users()
        elif command == "mostrar":
            show_users()
        else:
            print("❌ Comando no reconocido. Usar: crear, eliminar, mostrar")
    else:
        print("📖 Uso:")
        print("   python crear_usuarios.py crear    - Crear usuarios de prueba")
        print("   python crear_usuarios.py eliminar  - Eliminar todos los usuarios")
        print("   python crear_usuarios.py mostrar   - Mostrar usuarios actuales")
        print()
        print("🔑 Usuarios de prueba que se crearán:")
        print("   • admin_indiana@indianabill.com / admin123 (ADMIN)")
        print("   • carlos_admin@indianabill.com / admin456 (ADMIN)")
        print("   • juan_usuario@indianabill.com / usuario123 (USER)")
        print("   • maria_test@indianabill.com / test123 (USER)")
        print("   • ana_cliente@indianabill.com / cliente123 (USER)")
