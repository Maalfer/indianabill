#!/usr/bin/env python3
"""
migrate_to_postgres.py - Script para migrar datos de SQLite a PostgreSQL
"""

import sqlite3
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def migrate_sqlite_to_postgres():
    """Migra datos de SQLite a PostgreSQL"""
    
    # Configuración de bases de datos
    sqlite_db = "indianabill.db"
    postgres_url = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/indianabill")
    
    # Parsear PostgreSQL URL
    import re
    match = re.match(r"postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)", postgres_url)
    if not match:
        print("Error: No se pudo parsear la URL de PostgreSQL")
        return
    
    pg_user, pg_password, pg_host, pg_port, pg_database = match.groups()
    
    try:
        # Conectar a SQLite
        sqlite_conn = sqlite3.connect(sqlite_db)
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
        
        print("Conexiones establecidas. Iniciando migración...")
        
        # Obtener tablas de SQLite
        sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = sqlite_cursor.fetchall()
        
        for table_name, in tables:
            if table_name == 'sqlite_sequence':
                continue  # Saltar tabla de secuencia de SQLite
                
            print(f"Migrando tabla: {table_name}")
            
            # Obtener estructura de la tabla
            sqlite_cursor.execute(f"PRAGMA table_info({table_name})")
            columns = sqlite_cursor.fetchall()
            
            # Obtener datos de la tabla
            sqlite_cursor.execute(f"SELECT * FROM {table_name}")
            rows = sqlite_cursor.fetchall()
            
            if not rows:
                print(f"  - Tabla {table_name} vacía, saltando...")
                continue
            
            # Obtener nombres de columnas
            column_names = [col[1] for col in columns]
            
            # Preparar consulta de inserción para PostgreSQL
            placeholders = ', '.join(['%s'] * len(column_names))
            insert_query = f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({placeholders})"
            
            # Insertar datos en PostgreSQL
            try:
                if table_name == 'users':
                    # Para la tabla users, verificar si el email ya existe antes de insertar
                    for row in rows:
                        # row = (id, username, email, password, role, created_at)
                        email = row[2]  # email está en la posición 2
                        
                        # Verificar si el email ya existe
                        pg_cursor.execute("SELECT email FROM users WHERE email = %s", (email,))
                        if pg_cursor.fetchone() is None:
                            # Insertar solo si no existe
                            pg_cursor.execute(
                                "INSERT INTO users (id, username, email, password, role, created_at) VALUES (%s, %s, %s, %s, %s, %s)",
                                row
                            )
                            print(f"  - Usuario {email} insertado")
                        else:
                            print(f"  - Usuario {email} ya existe, omitiendo")
                else:
                    # Para otras tablas, usar inserción normal
                    pg_cursor.executemany(
                        f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({', '.join(['%s'] * len(column_names))})",
                        rows
                    )
                    print(f"  - {len(rows)} filas migradas a {table_name}")
            except Exception as e:
                print(f"  - Error migrando {table_name}: {e}")
                # Continuar con la siguiente tabla
                continue
        
        # Confirmar cambios
        pg_conn.commit()
        print("¡Migración completada exitosamente!")
        
    except Exception as e:
        print(f"Error durante la migración: {e}")
        if 'pg_conn' in locals():
            pg_conn.rollback()
    finally:
        # Cerrar conexiones
        if 'sqlite_conn' in locals():
            sqlite_conn.close()
        if 'pg_conn' in locals():
            pg_conn.close()

if __name__ == "__main__":
    print("=== Migración de SQLite a PostgreSQL ===")
    print("Asegúrate de que:")
    print("1. PostgreSQL está corriendo en Docker")
    print("2. El archivo .env está configurado correctamente")
    print("3. Las tablas existen en PostgreSQL (creadas por SQLAlchemy)")
    print()
    
    print("Iniciando migración automáticamente...")
    migrate_sqlite_to_postgres()
