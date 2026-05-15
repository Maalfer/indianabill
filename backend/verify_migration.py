#!/usr/bin/env python3
"""
verify_migration.py - Script para verificar que todos los usuarios se migraron correctamente
"""

import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def verify_migration():
    """Verifica que todos los usuarios se migraron correctamente"""
    
    # Parsear PostgreSQL URL
    database_url = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/indianabill")
    import re
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
        
        print("=== Verificación Completa de Migración ===")
        
        # Obtener todos los usuarios de PostgreSQL
        cursor.execute("SELECT id, username, email, role, created_at FROM users ORDER BY id")
        users = cursor.fetchall()
        
        print(f"\nTotal de usuarios en PostgreSQL: {len(users)}")
        print("\nLista de usuarios migrados:")
        print("ID | Username | Email | Role | Created At")
        print("-" * 80)
        
        for user in users:
            user_id, username, email, role, created_at = user
            print(f"{user_id} | {username} | {email} | {role} | {created_at}")
        
        # Verificación específica de usuarios clave
        print(f"\n=== Verificación de Usuarios Clave ===")
        
        key_users = ["ejemplo@ejemplo.es", "admin@indianabill.com", "prueba2@gmail.com", "prueba3@gmail.com"]
        
        for email in key_users:
            cursor.execute("SELECT id, username, role FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            if user:
                print(f"  - {email}: ENCONTRADO (ID: {user[0]}, Username: {user[1]}, Role: {user[2]})")
            else:
                print(f"  - {email}: NO ENCONTRADO")
        
        # Verificar contraseñas hasheadas
        cursor.execute("SELECT email, hashed_password FROM users WHERE hashed_password IS NOT NULL")
        hashed_users = cursor.fetchall()
        
        print(f"\n=== Verificación de Contraseñas ===")
        print(f"Usuarios con contraseña hasheada: {len(hashed_users)}")
        
        for email, hashed_password in hashed_users[:3]:  # Mostrar primeros 3
            is_hashed = hashed_password.startswith('$2') if hashed_password else False
            print(f"  - {email}: {'Hashed' if is_hashed else 'Not Hashed'}")
        
        conn.close()
        
        print(f"\n=== Resumen de Migración ===")
        print(f"Usuarios SQLite originales: 7")
        print(f"Usuarios PostgreSQL finales: {len(users)}")
        print(f"Usuario prueba3@gmail.com (ID 99): {'Preservado' if any(u[2] == 'prueba3@gmail.com' and u[0] == 99 for u in users) else 'No encontrado'}")
        print(f"¡Migración {'EXITOSA' if len(users) == 8 else 'INCOMPLETA'}!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    verify_migration()
