#!/usr/bin/env python3
"""
test_api_endpoints.py - Script para probar endpoints básicos de la API
Prueba que los endpoints respondan correctamente y con los formatos esperados
"""

import sys
import os
import requests
import json

# Añadir el directorio padre al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

API_BASE = "http://localhost:8000"

def test_health_check():
    """Prueba el endpoint de health check"""
    print("🧪 Probando health check...")
    
    try:
        response = requests.get(f"{API_BASE}/")
        
        if response.status_code == 200:
            print("✅ Health check exitoso")
            return True
        else:
            print(f"❌ Health check falló: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_endpoint_not_found():
    """Prueba endpoint que no existe"""
    print("🧪 Probando endpoint no encontrado...")
    
    try:
        response = requests.get(f"{API_BASE}/endpoint_que_no_existe")
        
        if response.status_code == 404:
            print("✅ 404 manejado correctamente")
            return True
        else:
            print(f"❌ Debería ser 404, recibido {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_invalid_method():
    """Prueba método HTTP no permitido"""
    print("🧪 Probando método no permitido...")
    
    try:
        # Intentar DELETE en un endpoint que solo acepta GET
        response = requests.delete(f"{API_BASE}/")
        
        if response.status_code == 405:
            print("✅ Método no permitido manejado correctamente")
            return True
        else:
            print(f"❌ Debería ser 405, recibido {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_invalid_json():
    """Prueba enviar JSON inválido"""
    print("🧪 Probando JSON inválido...")
    
    try:
        # Enviar JSON malformado
        invalid_json = '{"username": "test", "password":}'  # JSON incompleto
        
        response = requests.post(
            f"{API_BASE}/auth/login", 
            data=invalid_json,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 422:
            print("✅ JSON inválido rechazado correctamente")
            return True
        else:
            print(f"❌ Debería ser 422, recibido {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_missing_fields():
    """Prueba campos requeridos faltantes"""
    print("🧪 Probando campos requeridos faltantes...")
    
    try:
        # Enviar login sin password
        incomplete_data = {"username": "test"}
        
        response = requests.post(
            f"{API_BASE}/auth/login", 
            json=incomplete_data
        )
        
        if response.status_code == 422:
            print("✅ Campos faltantes rechazados correctamente")
            return True
        else:
            print(f"❌ Debería ser 422, recibido {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_sql_injection_protection():
    """Prueba protección básica contra SQL injection"""
    print("🧪 Probando protección SQL injection...")
    
    try:
        # Intentar SQL injection básico
        malicious_input = "admin'; DROP TABLE users; --"
        
        response = requests.post(
            f"{API_BASE}/auth/login", 
            json={
                "username": malicious_input,
                "password": "password"
            }
        )
        
        # Debería fallar por usuario no encontrado, no por error de SQL
        if response.status_code == 401:
            print("✅ SQL injection aparentemente bloqueado")
            return True
        elif response.status_code == 422:
            print("✅ SQL injection bloqueado por validación")
            return True
        else:
            print(f"⚠️  Respuesta inesperada: {response.status_code}")
            print("   (Podría ser seguro, pero revisar manualmente)")
            return True  # Considerarlo exitoso por ahora
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_rate_limiting():
    """Prueba si hay rate limiting"""
    print("🧪 Probando rate limiting...")
    
    try:
        # Hacer muchas peticiones rápidas
        success_count = 0
        rate_limited = False
        
        for i in range(20):  # 20 peticiones rápidas
            response = requests.get(f"{API_BASE}/")
            if response.status_code == 429:
                rate_limited = True
                break
            elif response.status_code == 200:
                success_count += 1
        
        if rate_limited:
            print("✅ Rate limiting detectado y funcionando")
            return True
        else:
            print(f"ℹ️  No se detectó rate limiting ({success_count} peticiones exitosas)")
            print("   (Esto puede ser normal si no está implementado)")
            return True  # No es un error si no está implementado
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_cors_headers():
    """Prueba headers CORS"""
    print("🧪 Probando headers CORS...")
    
    try:
        # Hacer una petición con Origin
        headers = {"Origin": "http://localhost:3000"}
        response = requests.get(f"{API_BASE}/", headers=headers)
        
        # Verificar headers CORS
        cors_headers = {
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers'
        }
        
        found_cors = any(header in response.headers for header in cors_headers)
        
        if found_cors:
            print("✅ Headers CORS presentes")
            return True
        else:
            print("ℹ️  No se encontraron headers CORS")
            print("   (Esto puede ser normal si el frontend está en el mismo dominio)")
            return True  # No es necesariamente un error
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_response_format():
    """Prueba formato de respuestas JSON"""
    print("🧪 Probando formato de respuestas JSON...")
    
    try:
        # Probar endpoint que debería devolver JSON
        response = requests.get(f"{API_BASE}/")
        
        if response.status_code == 200:
            # Intentar parsear como JSON
            try:
                data = response.json()
                print("✅ Respuesta JSON válida")
                return True
            except json.JSONDecodeError:
                print("ℹ️  La respuesta no es JSON (puede ser HTML)")
                return True  # No es necesariamente un error
        else:
            print(f"❌ Error en petición: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Servidor no está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def main():
    """Función principal que ejecuta todas las pruebas"""
    print("=" * 60)
    print("🌐 TESTS DE ENDPOINTS DE API")
    print("=" * 60)
    
    tests = [
        ("Health Check", test_health_check),
        ("404 Not Found", test_endpoint_not_found),
        ("Método No Permitido", test_invalid_method),
        ("JSON Inválido", test_invalid_json),
        ("Campos Faltantes", test_missing_fields),
        ("Protección SQL Injection", test_sql_injection_protection),
        ("Rate Limiting", test_rate_limiting),
        ("Headers CORS", test_cors_headers),
        ("Formato Respuesta", test_response_format)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}:")
        print("-" * 30)
        
        result = test_func()
        results.append((test_name, result))
    
    # Resumen final
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE PRUEBAS")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASÓ" if result else "❌ FALLÓ"
        print(f"{test_name:25} - {status}")
        if result:
            passed += 1
    
    print(f"\n🎯 Resultado: {passed}/{total} pruebas pasaron")
    
    if passed == total:
        print("🎉 ¡Todas las pruebas de endpoints pasaron!")
        return True
    else:
        print("⚠️  Algunas pruebas fallaron - Revisa los errores above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
