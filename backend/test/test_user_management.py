#!/usr/bin/env python3
"""
test_user_management.py - Script para probar gestión de usuarios
Prueba el cambio de roles, eliminación y administración de usuarios
"""

import sys
import os
import requests
import json

# Añadir el directorio padre al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

API_BASE = "http://localhost:8000"

def get_admin_token():
    """Obtiene token de administrador"""
    login_data = {
        "username": "admin_indiana",
        "password": "admin123"
    }
    
    try:
        response = requests.post(f"{API_BASE}/auth/login", json=login_data)
        if response.status_code == 200:
            return response.json().get("access_token")
        return None
    except:
        return None

def get_user_token():
    """Obtiene token de usuario normal"""
    login_data = {
        "username": "juan_usuario",
        "password": "usuario123"
    }
    
    try:
        response = requests.post(f"{API_BASE}/auth/login", json=login_data)
        if response.status_code == 200:
            return response.json().get("access_token")
        return None
    except:
        return None

def test_create_test_users():
    """Crea usuarios de prueba si no existen"""
    print("🧪 Creando usuarios de prueba...")
    
    test_users = [
        {
            "username": "test_role_user",
            "email": "test_role@example.com",
            "password": "test123456",
            "description": "Usuario para pruebas de rol"
        },
        {
            "username": "test_admin_user",
            "email": "test_admin@example.com",
            "password": "admin123456",
            "description": "Usuario para pruebas de admin"
        }
    ]
    
    success = True
    for user in test_users:
        try:
            response = requests.post(f"{API_BASE}/auth/register", json=user)
            if response.status_code in [201, 400]:  # 400 si ya existe
                print(f"✅ Usuario {user['username']} listo")
            else:
                print(f"❌ Error creando {user['username']}: {response.status_code}")
                success = False
        except Exception as e:
            print(f"❌ Error creando {user['username']}: {e}")
            success = False
    
    return success

def test_role_change_as_admin():
    """Prueba cambiar rol como administrador"""
    print("🧪 Probando cambio de rol como administrador...")
    
    admin_token = get_admin_token()
    if not admin_token:
        print("❌ No se pudo obtener token de administrador")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    # Cambiar rol de usuario normal a admin
    role_data = {"role": "admin"}
    
    try:
        # Primero obtener el ID del usuario test_role_user
        response = requests.get(f"{API_BASE}/admin/users", headers=headers)
        if response.status_code != 200:
            print("❌ No se pudo obtener lista de usuarios")
            return False
        
        users = response.json()
        test_user = next((u for u in users if u['username'] == 'test_role_user'), None)
        
        if not test_user:
            print("❌ No se encontró el usuario de prueba")
            return False
        
        # Cambiar rol
        response = requests.put(
            f"{API_BASE}/admin/users/{test_user['id']}", 
            json=role_data, 
            headers=headers
        )
        
        if response.status_code == 200:
            print("✅ Rol cambiado exitosamente a admin")
            
            # Verificar el cambio
            response = requests.get(f"{API_BASE}/admin/users", headers=headers)
            if response.status_code == 200:
                users = response.json()
                updated_user = next((u for u in users if u['username'] == 'test_role_user'), None)
                if updated_user and updated_user['role'] == 'admin':
                    print("✅ Verificación: Rol actualizado correctamente")
                    return True
                else:
                    print("❌ Verificación: El rol no se actualizó")
                    return False
            else:
                print("❌ No se pudo verificar el cambio")
                return False
        else:
            print(f"❌ Error cambiando rol: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_role_change_as_user():
    """Prueba cambiar rol como usuario normal (debería fallar)"""
    print("🧪 Probando cambio de rol como usuario normal (debería fallar)...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    # Intentar cambiar rol
    role_data = {"role": "admin"}
    
    try:
        response = requests.put(f"{API_BASE}/admin/users/1", json=role_data, headers=headers)
        
        if response.status_code == 403:
            print("✅ Acceso denegado correctamente (usuario no puede cambiar roles)")
            return True
        else:
            print(f"❌ Error: debería ser 403, recibido {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_user_list_as_admin():
    """Prueba obtener lista de usuarios como administrador"""
    print("🧪 Probando obtener lista de usuarios como administrador...")
    
    admin_token = get_admin_token()
    if not admin_token:
        print("❌ No se pudo obtener token de administrador")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    try:
        response = requests.get(f"{API_BASE}/admin/users", headers=headers)
        
        if response.status_code == 200:
            users = response.json()
            if isinstance(users, list) and len(users) > 0:
                print(f"✅ Lista obtenida: {len(users)} usuarios")
                return True
            else:
                print("❌ La respuesta no es una lista válida")
                return False
        else:
            print(f"❌ Error obteniendo usuarios: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_user_list_as_user():
    """Prueba obtener lista de usuarios como usuario normal (debería fallar)"""
    print("🧪 Probando obtener lista de usuarios como usuario normal (debería fallar)...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    try:
        response = requests.get(f"{API_BASE}/admin/users", headers=headers)
        
        if response.status_code == 403:
            print("✅ Acceso denegado correctamente (usuario no puede ver lista)")
            return True
        else:
            print(f"❌ Error: debería ser 403, recibido {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_delete_user_as_admin():
    """Prueba eliminar usuario como administrador"""
    print("🧪 Probando eliminar usuario como administrador...")
    
    admin_token = get_admin_token()
    if not admin_token:
        print("❌ No se pudo obtener token de administrador")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    # Crear un usuario para eliminar
    test_user = {
        "username": "user_to_delete",
        "email": "delete@example.com",
        "password": "delete123456",
        "description": "Usuario para eliminar"
    }
    
    try:
        # Crear usuario
        response = requests.post(f"{API_BASE}/auth/register", json=test_user)
        if response.status_code not in [201, 400]:
            print("❌ No se pudo crear usuario para eliminar")
            return False
        
        # Obtener ID del usuario
        response = requests.get(f"{API_BASE}/admin/users", headers=headers)
        if response.status_code != 200:
            print("❌ No se pudo obtener lista de usuarios")
            return False
        
        users = response.json()
        user_to_delete = next((u for u in users if u['username'] == 'user_to_delete'), None)
        
        if not user_to_delete:
            print("❌ No se encontró el usuario para eliminar")
            return False
        
        # Eliminar usuario
        response = requests.delete(f"{API_BASE}/admin/users/{user_to_delete['id']}", headers=headers)
        
        if response.status_code == 200:
            print("✅ Usuario eliminado exitosamente")
            return True
        else:
            print(f"❌ Error eliminando usuario: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def main():
    """Función principal que ejecuta todas las pruebas"""
    print("=" * 60)
    print("👥 TESTS DE GESTIÓN DE USUARIOS")
    print("=" * 60)
    
    # Primero crear usuarios de prueba
    if not test_create_test_users():
        print("❌ No se pudieron crear usuarios de prueba")
        return False
    
    tests = [
        ("Lista Usuarios (Admin)", test_user_list_as_admin),
        ("Lista Usuarios (Usuario)", test_user_list_as_user),
        ("Cambiar Rol (Admin)", test_role_change_as_admin),
        ("Cambiar Rol (Usuario)", test_role_change_as_user),
        ("Eliminar Usuario (Admin)", test_delete_user_as_admin)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}:")
        print("-" * 40)
        
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
        print("🎉 ¡Todas las pruebas de gestión de usuarios pasaron!")
        return True
    else:
        print("⚠️  Algunas pruebas fallaron - Revisa los errores above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
