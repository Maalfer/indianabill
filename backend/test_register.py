#!/usr/bin/env python3
"""
test_register.py - Script para probar el endpoint de registro directamente
"""

import requests
import json

def test_register_endpoint():
    """Prueba el endpoint de registro con diferentes usuarios"""
    
    base_url = "http://localhost:8000"
    
    print("=== Prueba del Endpoint de Registro ===")
    print(f"URL base: {base_url}")
    
    # Probar health check primero
    try:
        response = requests.get(f"{base_url}/")
        print(f"\nHealth Check: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error en health check: {e}")
        return
    
    # Probar registro con nuevos usuarios
    test_users = [
        {
            "username": "nuevo_usuario1",
            "email": "nuevo1@test.com",
            "password": "password123",
            "confirm_password": "password123"
        },
        {
            "username": "nuevo_usuario2", 
            "email": "nuevo2@test.com",
            "password": "password123",
            "confirm_password": "password123"
        },
        {
            "username": "test_user",
            "email": "test@test.com", 
            "password": "test123",
            "confirm_password": "test123"
        }
    ]
    
    for i, user in enumerate(test_users, 1):
        print(f"\n--- Test {i}: Registrando {user['email']} ---")
        
        try:
            response = requests.post(
                f"{base_url}/auth/register",
                json=user,
                headers={"Content-Type": "application/json"},
                timeout=10  # Timeout de 10 segundos
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Registro exitoso!")
                print(f"Message: {data.get('message', 'N/A')}")
            elif response.status_code == 400:
                try:
                    error_data = response.json()
                    print(f"Error de validación: {error_data.get('detail', 'No detail')}")
                except:
                    print(f"Error 400: {response.text}")
            elif response.status_code == 422:
                try:
                    error_data = response.json()
                    print(f"Error de validación 422: {error_data.get('detail', 'No detail')}")
                except:
                    print(f"Error 422: {response.text}")
            else:
                print(f"Error inesperado: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Detail: {error_data.get('detail', 'No detail')}")
                except:
                    print(f"Response: {response.text}")
                    
        except requests.exceptions.ConnectionError as e:
            print(f"Error de conexión: {e}")
        except requests.exceptions.Timeout as e:
            print(f"Timeout: {e}")
        except Exception as e:
            print(f"Error inesperado: {e}")
    
    # Verificar usuarios después de los intentos de registro
    print(f"\n--- Verificando usuarios después de registros ---")
    try:
        response = requests.get(f"{base_url}/users/")
        if response.status_code == 200:
            users = response.json()
            print(f"Total usuarios en BD: {len(users)}")
            
            # Buscar usuarios nuevos
            new_users = [u for u in users if u['email'] in ['nuevo1@test.com', 'nuevo2@test.com', 'test@test.com']]
            print(f"Usuarios nuevos registrados: {len(new_users)}")
            
            for user in new_users:
                print(f"  - {user['email']} (ID: {user['id']})")
        else:
            print(f"Error obteniendo usuarios: {response.status_code}")
    except Exception as e:
        print(f"Error verificando usuarios: {e}")

if __name__ == "__main__":
    test_register_endpoint()
