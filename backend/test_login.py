#!/usr/bin/env python3
"""
test_login.py - Script para probar el endpoint de login directamente
"""

import requests
import json

def test_login_endpoint():
    """Prueba el endpoint de login con diferentes usuarios"""
    
    base_url = "http://localhost:8000"
    
    print("=== Prueba del Endpoint de Login ===")
    print(f"URL base: {base_url}")
    
    # Probar health check primero
    try:
        response = requests.get(f"{base_url}/")
        print(f"\nHealth Check: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error en health check: {e}")
        return
    
    # Probar login con usuarios migrados
    test_users = [
        {"email": "ejemplo@ejemplo.es", "password": "password123"},
        {"email": "admin@indianabill.com", "password": "admin123"},
        {"email": "prueba2@gmail.com", "password": "password123"},
        {"email": "prueba3@gmail.com", "password": "password123"}
    ]
    
    for user in test_users:
        print(f"\n--- Probando login con: {user['email']} ---")
        
        try:
            response = requests.post(
                f"{base_url}/auth/login",
                json=user,
                headers={"Content-Type": "application/json"}
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Login exitoso!")
                print(f"Access Token: {data.get('access_token', 'N/A')[:20]}...")
                print(f"Token Type: {data.get('token_type', 'N/A')}")
            else:
                print(f"Error: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Detail: {error_data.get('detail', 'No detail')}")
                except:
                    print(f"Response: {response.text}")
                    
        except requests.exceptions.ConnectionError as e:
            print(f"Error de conexión: {e}")
        except Exception as e:
            print(f"Error inesperado: {e}")
    
    # Probar el endpoint de usuarios
    print(f"\n--- Probando endpoint de usuarios ---")
    try:
        response = requests.get(f"{base_url}/users/")
        print(f"Users endpoint status: {response.status_code}")
        if response.status_code == 200:
            users = response.json()
            print(f"Total usuarios: {len(users)}")
        else:
            print(f"Error en users endpoint: {response.text}")
    except Exception as e:
        print(f"Error probando users endpoint: {e}")

if __name__ == "__main__":
    test_login_endpoint()
