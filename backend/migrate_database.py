#!/usr/bin/env python3
"""
migrate_database.py - Script para migrar la base de datos existente
Añade la columna 'role' a la tabla 'users' y establece valores por defecto
"""

import sys
import os
import sqlite3
from pathlib import Path

# Ruta a la base de datos
DB_PATH = Path(__file__).parent / "indianabill.db"

def migrate_database():
    """Migrar la base de datos para añadir la columna role"""
    
    if not DB_PATH.exists():
        print("❌ La base de datos no existe. Ejecuta la aplicación primero para crearla.")
        return False
    
    try:
        # Conectar a la base de datos
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()
        
        # Verificar si la columna role ya existe
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'role' in columns:
            print("✅ La columna 'role' ya existe en la tabla 'users'")
            return True
        
        print("🔄 Migrando base de datos...")
        
        # Añadir la columna role
        cursor.execute("""
            ALTER TABLE users 
            ADD COLUMN role TEXT DEFAULT 'user'
        """)
        
        # Actualizar todos los usuarios existentes a rol 'USER' (mayúscula para el enum)
        cursor.execute("""
            UPDATE users 
            SET role = 'USER' 
            WHERE role IS NULL OR role = 'user'
        """)
        
        # Confirmar cambios
        conn.commit()
        
        print("✅ Migración completada exitosamente")
        print("   • Columna 'role' añadida a la tabla 'users'")
        print("   • Usuarios existentes establecidos como 'user'")
        
        # Verificar la migración
        cursor.execute("SELECT id, username, email, role FROM users")
        users = cursor.fetchall()
        print(f"\n📊 Usuarios en la base de datos ({len(users)}):")
        for user in users:
            print(f"   • ID: {user[0]}, Usuario: {user[1]}, Email: {user[2]}, Rol: {user[3]}")
        
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Error al migrar la base de datos: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()

def backup_database():
    """Crear una copia de seguridad de la base de datos"""
    
    if not DB_PATH.exists():
        print("❌ La base de datos no existe para hacer backup")
        return False
    
    try:
        backup_path = DB_PATH.with_suffix('.db.backup')
        import shutil
        shutil.copy2(DB_PATH, backup_path)
        print(f"✅ Backup creado en: {backup_path}")
        return True
    except Exception as e:
        print(f"❌ Error al crear backup: {e}")
        return False

if __name__ == "__main__":
    print("🗄️  Script de Migración de Base de Datos - Indiana Bill")
    print("=" * 60)
    
    # Crear backup antes de migrar
    print("\n📦 Creando backup de la base de datos...")
    if backup_database():
        print("✅ Backup creado exitosamente")
    else:
        print("⚠️  No se pudo crear el backup")
    
    # Migrar la base de datos
    print("\n🔄 Iniciando migración...")
    if migrate_database():
        print("\n🎉 Migración completada exitosamente!")
        print("\n📝 Siguientes pasos:")
        print("   1. Reinicia el backend: uvicorn app.main:app --reload")
        print("   2. Ejecuta: python crear_usuarios.py crear")
        print("   3. Inicia sesión como admin para probar el panel")
    else:
        print("\n❌ La migración falló. Revisa los errores arriba.")
        print("   Considera restaurar desde el backup si es necesario.")
