#!/usr/bin/env python3
"""
test_auth.py - Script para probar funcionalidades de autenticación
Prueba el login, registro y verificación de tokens
"""

import sys
import os
import requests
import json

# Añadir el directorio padre al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

API_BASE = "http://localhost:8000"

def test_user_registration():
    """Prueba el registro de usuarios"""
    print("🧪 Probando registro de usuarios...")
    
    test_user = {
        "username": "test_user_auth",
        "email": "test_auth@example.com",
        "password": "test123456",
        "description": "Usuario de prueba para autenticación"
    }
    
    try:
        response = requests.post(f"{API_BASE}/auth/register", json=test_user)
        
        if response.status_code == 201:
            print("✅ Registro exitoso")
            return True
        elif response.status_code == 400:
            print("ℹ️  El usuario ya existe (esperado en pruebas repetidas)")
            return True
        else:
            print(f"❌ Error en registro: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_user_login():
    """Prueba el inicio de sesión"""
    print("🧪 Probando inicio de sesión...")
    
    login_data = {
        "username": "test_user_auth",
        "password": "test123456"
    }
    
    try:
        response = requests.post(f"{API_BASE}/auth/login", json=login_data)
        
        if response.status_code == 200:
            data = response.json()
            if "access_token" in data:
                print("✅ Login exitoso - Token obtenido")
                return data["access_token"]
            else:
                print("❌ Login exitoso pero no hay token")
                return None
        else:
            print(f"❌ Error en login: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return None
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return None
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return None

def test_token_validation(token):
    """Prueba la validación del token"""
    print("🧪 Probando validación de token...")
    
    if not token:
        print("❌ No hay token para validar")
        return False
    
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{API_BASE}/auth/me", headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("username") == "test_user_auth":
                print("✅ Token válido - Usuario correcto")
                return True
            else:
                print("❌ Token válido pero usuario incorrecto")
                return False
        else:
            print(f"❌ Error en validación: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_protected_endpoint(token):
    """Prueba acceso a endpoint protegido"""
    print("🧪 Probando acceso a endpoint protegido...")
    
    if not token:
        print("❌ No hay token para probar")
        return False
    
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{API_BASE}/dashboard", headers=headers)
        
        if response.status_code == 200:
            print("✅ Acceso a endpoint protegido exitoso")
            return True
        else:
            print(f"❌ Error en acceso protegido: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_invalid_login():
    """Prueba login con credenciales inválidas"""
    print("🧪 Probando login con credenciales inválidas...")
    
    invalid_data = {
        "username": "usuario_inexistente",
        "password": "password_incorrecto"
    }
    
    try:
        response = requests.post(f"{API_BASE}/auth/login", json=invalid_data)
        
        if response.status_code == 401:
            print("✅ Login inválido rechazado correctamente")
            return True
        else:
            print(f"❌ Error: debería ser 401, recibido {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def main():
    """Función principal que ejecuta todas las pruebas"""
    print("=" * 60)
    print("🔐 TESTS DE AUTENTICACIÓN")
    print("=" * 60)
    
    tests = [
        ("Registro", test_user_registration),
        ("Login", test_user_login),
        ("Validación Token", lambda: test_token_validation(None)),  # Se actualizará después
        ("Endpoint Protegido", lambda: test_protected_endpoint(None)),  # Se actualizará después
        ("Login Inválido", test_invalid_login)
    ]
    
    results = []
    token = None
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}:")
        print("-" * 30)
        
        if test_name == "Validación Token" or test_name == "Endpoint Protegido":
            result = test_func(token)
        elif test_name == "Login":
            token = test_func()
            result = token is not None
        else:
            result = test_func()
        
        results.append((test_name, result))
    
    # Actualizar pruebas que dependen del token
    print(f"\n📋 Validación Token:")
    print("-" * 30)
    token_valid = test_token_validation(token)
    results[2] = ("Validación Token", token_valid)
    
    print(f"\n📋 Endpoint Protegido:")
    print("-" * 30)
    protected_access = test_protected_endpoint(token)
    results[3] = ("Endpoint Protegido", protected_access)
    
    # Resumen final
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE PRUEBAS")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASÓ" if result else "❌ FALLÓ"
        print(f"{test_name:20} - {status}")
        if result:
            passed += 1
    
    print(f"\n🎯 Resultado: {passed}/{total} pruebas pasaron")
    
    if passed == total:
        print("🎉 ¡Todas las pruebas de autenticación pasaron!")
        return True
    else:
        print("⚠️  Algunas pruebas fallaron - Revisa los errores above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
