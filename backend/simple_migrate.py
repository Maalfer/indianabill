#!/usr/bin/env python3
"""
simple_migrate.py - Script simple para migrar datos de SQLite a PostgreSQL
"""

import sqlite3
import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def simple_migrate():
    """Migra datos de SQLite a PostgreSQL de forma simple"""
    
    # Parsear PostgreSQL URL
    database_url = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/indianabill")
    import re
    match = re.match(r"postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)", database_url)
    
    if not match:
        print("Error: No se pudo parsear la URL de PostgreSQL")
        return
    
    pg_user, pg_password, pg_host, pg_port, pg_database = match.groups()
    
    try:
        # Conectar a SQLite
        sqlite_conn = sqlite3.connect("indianabill.db")
        sqlite_cursor = sqlite_conn.cursor()
        
        # Conectar a PostgreSQL
        pg_conn = psycopg2.connect(
            host=pg_host,
            port=pg_port,
            database=pg_database,
            user=pg_user,
            password=pg_password
        )
        pg_cursor = pg_conn.cursor()
        
        print("=== Migración Simple de SQLite a PostgreSQL ===")
        print("Conexiones establecidas. Iniciando migración...")
        
        # Obtener usuarios de SQLite
        sqlite_cursor.execute("SELECT * FROM users")
        sqlite_users = sqlite_cursor.fetchall()
        
        print(f"Usuarios encontrados en SQLite: {len(sqlite_users)}")
        
        # Obtener usuarios existentes en PostgreSQL
        pg_cursor.execute("SELECT email FROM users")
        existing_emails = {row[0] for row in pg_cursor.fetchall()}
        
        print(f"Usuarios existentes en PostgreSQL: {len(existing_emails)}")
        
        migrated_count = 0
        
        # Migrar cada usuario
        for user_row in sqlite_users:
            # user_row = (id, username, email, hashed_password, role, description, created_at, updated_at)
            user_id = user_row[0]
            username = user_row[1]
            email = user_row[2]
            hashed_password = user_row[3]
            role = user_row[4]
            description = user_row[5]
            created_at = user_row[6]
            updated_at = user_row[7]
            
            if email not in existing_emails:
                try:
                    # Insertar en PostgreSQL con todas las columnas correctas
                    pg_cursor.execute(
                        "INSERT INTO users (id, username, email, hashed_password, role, description, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                        (user_id, username, email, hashed_password, role, description, created_at, updated_at)
                    )
                    print(f"  - Usuario {email} migrado (ID: {user_id})")
                    migrated_count += 1
                except Exception as e:
                    print(f"  - Error migrando {email}: {e}")
            else:
                print(f"  - Usuario {email} ya existe, omitiendo")
        
        # Confirmar cambios
        pg_conn.commit()
        print(f"\n¡Migración completada!")
        print(f"Usuarios migrados: {migrated_count}")
        
        # Verificar resultado
        pg_cursor.execute("SELECT COUNT(*) FROM users")
        total_users = pg_cursor.fetchone()[0]
        print(f"Total usuarios en PostgreSQL: {total_users}")
        
        # Cerrar conexiones
        sqlite_conn.close()
        pg_conn.close()
        
    except Exception as e:
        print(f"Error durante la migración: {e}")
        if 'pg_conn' in locals():
            pg_conn.rollback()

if __name__ == "__main__":
    simple_migrate()
