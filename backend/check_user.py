#!/usr/bin/env python3
"""
check_user.py - Script para verificar si un usuario específico existe en PostgreSQL
"""

import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def check_user_exists(email):
    """Verifica si un usuario específico existe en la base de datos"""
    
    # Parsear PostgreSQL URL
    import re
    database_url = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/indianabill")
    match = re.match(r"postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)", database_url)
    
    if not match:
        print("Error: No se pudo parsear la URL de PostgreSQL")
        return
    
    pg_user, pg_password, pg_host, pg_port, pg_database = match.groups()
    
    try:
        # Conectar a PostgreSQL
        conn = psycopg2.connect(
            host=pg_host,
            port=pg_port,
            database=pg_database,
            user=pg_user,
            password=pg_password
        )
        cursor = conn.cursor()
        
        print(f"=== Verificación de Usuario: {email} ===\n")
        
        # Consultar si el usuario existe
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if user:
            print("¡USUARIO ENCONTRADO!")
            print(f"ID: {user[0]}")
            print(f"Username: {user[1]}")
            print(f"Email: {user[2]}")
            print(f"Role: {user[4]}")
            print(f"Created At: {user[5]}")
            
            # Verificar si la contraseña está hasheada
            print(f"Password Hash: {'Hashed' if user[3].startswith('$2') else 'Plain Text'}")
            
        else:
            print(f"USUARIO NO ENCONTRADO: {email}")
            print("\nUsuarios existentes en la base de datos:")
            
            # Mostrar todos los usuarios para referencia
            cursor.execute("SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC")
            users = cursor.fetchall()
            
            if users:
                print("ID | Username | Email | Role | Created At")
                print("-" * 80)
                for user in users:
                    print(f"{user[0]} | {user[1]} | {user[2]} | {user[3]} | {user[4]}")
            else:
                print("No hay usuarios en la base de datos.")
        
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Verificar el usuario específico
    check_user_exists("prueba3@gmail.com")
