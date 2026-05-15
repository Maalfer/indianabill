#!/usr/bin/env python3
"""
setup_env.py - Script para crear el archivo .env automáticamente
"""

import os
import shutil

def create_env_file():
    """Crea el archivo .env basado en .env.example"""
    
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    env_example_path = os.path.join(backend_dir, '.env.example')
    env_path = os.path.join(backend_dir, '.env')
    
    if os.path.exists(env_path):
        print("El archivo .env ya existe.")
        response = input("¿Deseas sobrescribirlo? (s/n): ")
        if response.lower() != 's':
            print("Operación cancelada.")
            return
    
    if not os.path.exists(env_example_path):
        print("Error: No se encuentra el archivo .env.example")
        return
    
    # Copiar .env.example a .env
    shutil.copy2(env_example_path, env_path)
    print(f"Archivo .env creado en: {env_path}")
    print("\nConfiguración por defecto:")
    print("- Base de datos: PostgreSQL en localhost:5432")
    print("- Usuario: postgres")
    print("- Contraseña: password")
    print("- Base de datos: indianabill")
    print("\nImportante:")
    print("1. Asegúrate de que PostgreSQL esté corriendo en Docker")
    print("2. Cambia 'password' por una contraseña segura si es necesario")
    print("3. Inicia PostgreSQL con: docker-compose up -d")

if __name__ == "__main__":
    create_env_file()
