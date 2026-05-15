#!/usr/bin/env python3
"""
check_postgres_structure.py - Script para verificar la estructura de la tabla PostgreSQL
"""

import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def check_postgres_structure():
    """Verifica la estructura de la tabla users en PostgreSQL"""
    
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
        
        print("=== Estructura de la Tabla Users en PostgreSQL ===")
        
        # Obtener estructura de la tabla
        cursor.execute("""
            SELECT column_name, data_type, ordinal_position 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND table_schema = 'public'
            ORDER BY ordinal_position
        """)
        columns = cursor.fetchall()
        
        print("Columnas:")
        for col in columns:
            print(f"  {col[0]} ({col[1]}) - Posición: {col[2]}")
        
        print(f"\nTotal de columnas: {len(columns)}")
        
        # Obtener usuarios existentes
        cursor.execute("SELECT email FROM users")
        existing_users = cursor.fetchall()
        print(f"\nUsuarios existentes en PostgreSQL: {len(existing_users)}")
        for user in existing_users:
            print(f"  - {user[0]}")
        
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_postgres_structure()
