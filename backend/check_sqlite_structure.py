#!/usr/bin/env python3
"""
check_sqlite_structure.py - Script para verificar la estructura de la tabla SQLite
"""

import sqlite3

def check_sqlite_structure():
    """Verifica la estructura de la tabla users en SQLite"""
    
    try:
        # Conectar a SQLite
        conn = sqlite3.connect("indianabill.db")
        cursor = conn.cursor()
        
        print("=== Estructura de la Tabla Users en SQLite ===")
        
        # Obtener estructura de la tabla
        cursor.execute("PRAGMA table_info(users)")
        columns = cursor.fetchall()
        
        print("Columnas:")
        for col in columns:
            print(f"  {col[1]} ({col[2]}) - Posición: {col[0]}")
        
        print(f"\nTotal de columnas: {len(columns)}")
        
        # Obtener algunos datos de ejemplo
        cursor.execute("SELECT * FROM users LIMIT 1")
        sample_row = cursor.fetchone()
        
        if sample_row:
            print(f"\nEjemplo de fila ({len(sample_row)} valores):")
            for i, value in enumerate(sample_row):
                print(f"  Posición {i}: {value}")
        
        # Contar usuarios
        cursor.execute("SELECT COUNT(*) FROM users")
        user_count = cursor.fetchone()[0]
        print(f"\nTotal de usuarios en SQLite: {user_count}")
        
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_sqlite_structure()
