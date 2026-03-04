#!/usr/bin/env python3
"""
fix_roles.py - Script para corregir los valores de roles en la base de datos
Convierte 'user' a 'USER' y 'admin' a 'ADMIN' para que coincidan con el enum
"""

import sys
import os
import sqlite3
from pathlib import Path

# Ruta a la base de datos
DB_PATH = Path(__file__).parent / "indianabill.db"

def fix_roles():
    """Corregir los valores de roles en la base de datos"""
    
    if not DB_PATH.exists():
        print("❌ La base de datos no existe")
        return False
    
    try:
        # Conectar a la base de datos
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()
        
        print("🔧 Corrigiendo valores de roles...")
        
        # Verificar valores actuales
        cursor.execute("SELECT id, username, email, role FROM users")
        users = cursor.fetchall()
        
        print("📊 Valores actuales:")
        for user in users:
            print(f"   • ID: {user[0]}, Usuario: {user[1]}, Rol: '{user[3]}'")
        
        # Corregir 'user' a 'USER'
        cursor.execute("""
            UPDATE users 
            SET role = 'USER' 
            WHERE role = 'user'
        """)
        
        # Corregir 'admin' a 'ADMIN'
        cursor.execute("""
            UPDATE users 
            SET role = 'ADMIN' 
            WHERE role = 'admin'
        """)
        
        # Establecer 'USER' como valor por defecto para nulos
        cursor.execute("""
            UPDATE users 
            SET role = 'USER' 
            WHERE role IS NULL
        """)
        
        # Confirmar cambios
        conn.commit()
        
        print("\n✅ Roles corregidos exitosamente")
        
        # Verificar después de la corrección
        cursor.execute("SELECT id, username, email, role FROM users")
        users = cursor.fetchall()
        
        print("\n📊 Valores corregidos:")
        for user in users:
            print(f"   • ID: {user[0]}, Usuario: {user[1]}, Rol: '{user[3]}'")
        
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Error al corregir roles: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    print("🔧 Script de Corrección de Roles - Indiana Bill")
    print("=" * 50)
    
    if fix_roles():
        print("\n🎉 Corrección completada exitosamente!")
        print("\n📝 Siguientes pasos:")
        print("   1. Reinicia el backend: uvicorn app.main:app --reload")
        print("   2. Ejecuta: python crear_usuarios.py mostrar")
        print("   3. Prueba iniciar sesión")
    else:
        print("\n❌ La corrección falló. Revisa los errores arriba.")
