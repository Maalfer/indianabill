#!/usr/bin/env python3
"""
update_user_id.py - Script para cambiar el ID de un usuario específico
"""

import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def update_user_id():
    """Cambia el ID del usuario prueba3@gmail.com a 99"""
    
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
        
        print("=== Actualizando ID de Usuario ===")
        print("Cambiando ID de prueba3@gmail.com a 99...")
        
        # Verificar el usuario actual
        cursor.execute("SELECT id, username, email FROM users WHERE email = %s", ("prueba3@gmail.com",))
        user = cursor.fetchone()
        
        if user:
            print(f"Usuario encontrado: ID={user[0]}, Username={user[1]}, Email={user[2]}")
            
            # Actualizar el ID a 99
            cursor.execute("UPDATE users SET id = 99 WHERE email = %s", ("prueba3@gmail.com",))
            conn.commit()
            
            # Verificar el cambio
            cursor.execute("SELECT id, username, email FROM users WHERE email = %s", ("prueba3@gmail.com",))
            updated_user = cursor.fetchone()
            
            print(f"Usuario actualizado: ID={updated_user[0]}, Username={updated_user[1]}, Email={updated_user[2]}")
            print("¡ID cambiado exitosamente!")
        else:
            print("Usuario prueba3@gmail.com no encontrado.")
        
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_user_id()
