#!/usr/bin/env python3
"""
test_postgres_connection.py - Script para verificar la conexión con PostgreSQL
"""

import sys
import os
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def test_postgres_connection():
    """Prueba la conexión con PostgreSQL"""
    
    print("=== Verificación de Conexión PostgreSQL ===\n")
    
    # Obtener URL de la base de datos
    database_url = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/indianabill")
    
    print(f"URL de conexión: {database_url}")
    print("Intentando conectar a PostgreSQL...\n")
    
    try:
        # Crear engine de SQLAlchemy
        engine = create_engine(database_url)
        
        # Probar conexión
        with engine.connect() as connection:
            # Ejecutar consulta simple
            result = connection.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            
            print("¡Conexión exitosa!")
            print(f"Versión de PostgreSQL: {version}")
            
            # Verificar si la base de datos indianabill existe
            try:
                result = connection.execute(text("SELECT current_database();"))
                db_name = result.fetchone()[0]
                print(f"Base de datos actual: {db_name}")
                
                # Listar tablas
                result = connection.execute(text("""
                    SELECT table_name FROM information_schema.tables 
                    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
                """))
                tables = [row[0] for row in result.fetchall()]
                
                if tables:
                    print(f"Tablas encontradas: {', '.join(tables)}")
                else:
                    print("No se encontraron tablas. SQLAlchemy las creará al iniciar la aplicación.")
                    
            except Exception as e:
                print(f"Advertencia: No se pudo verificar la base de datos: {e}")
        
        print("\n=== Configuración Verificada ===")
        print("La aplicación está configurada para usar PostgreSQL.")
        print("Todos los nuevos datos se guardarán en PostgreSQL.")
        return True
        
    except SQLAlchemyError as e:
        print(f"Error de conexión a PostgreSQL: {e}")
        print("\n=== Soluciones Posibles ===")
        print("1. Asegúrate de que PostgreSQL esté corriendo: docker-compose ps")
        print("2. Inicia PostgreSQL: docker-compose up -d")
        print("3. Verifica las credenciales en el archivo .env")
        print("4. Confirma que el puerto 5432 esté disponible")
        return False
        
    except Exception as e:
        print(f"Error inesperado: {e}")
        return False

def check_env_file():
    """Verifica si el archivo .env existe y está configurado"""
    
    print("=== Verificación de Archivo .env ===\n")
    
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    if not os.path.exists(env_path):
        print("El archivo .env no existe.")
        print("Ejecuta: python setup_env.py")
        return False
    
    # Cargar y verificar variables importantes
    load_dotenv()
    
    required_vars = ['DATABASE_URL', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB']
    missing_vars = []
    
    for var in required_vars:
        value = os.getenv(var)
        if not value:
            missing_vars.append(var)
        else:
            if var == 'DATABASE_URL':
                print(f"DATABASE_URL: {value}")
            else:
                print(f"{var}: {'*' * len(value) if 'PASSWORD' in var else value}")
    
    if missing_vars:
        print(f"\nVariables faltantes: {', '.join(missing_vars)}")
        return False
    
    print("\nArchivo .env configurado correctamente.")
    return True

if __name__ == "__main__":
    print("=== Verificación Completa de Configuración PostgreSQL ===\n")
    
    # Verificar archivo .env
    env_ok = check_env_file()
    print("\n" + "="*50 + "\n")
    
    # Probar conexión
    if env_ok:
        connection_ok = test_postgres_connection()
        
        if connection_ok:
            print("\n¡TODO CONFIGURADO CORRECTAMENTE!")
            print("La aplicación usará PostgreSQL para guardar todos los datos.")
        else:
            print("\nREVISA LA CONFIGURACIÓN ANTES DE INICIAR LA APLICACIÓN.")
    else:
        print("\nCONFIGURA EL ARCHIVO .ENV PRIMERO.")
