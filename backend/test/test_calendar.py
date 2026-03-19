#!/usr/bin/env python3
"""
test_calendar.py - Script para probar funcionalidades del calendario
Prueba la disponibilidad, creación y gestión de reservas
"""

import sys
import os
import requests
import json
from datetime import datetime, timedelta

# Añadir el directorio padre al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

API_BASE = "http://localhost:8000"

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

def test_calendar_availability():
    """Prueba obtener disponibilidad del calendario"""
    print("🧪 Probando disponibilidad del calendario...")
    
    try:
        # Obtener disponibilidad para el mes actual
        today = datetime.now()
        year = today.year
        month = today.month
        
        response = requests.get(f"{API_BASE}/calendar/availability/{year}/{month}")
        
        if response.status_code == 200:
            availability = response.json()
            if isinstance(availability, dict):
                print(f"✅ Disponibilidad obtenida para {year}-{month}")
                print(f"   Días con datos: {len(availability)}")
                return True
            else:
                print("❌ Respuesta no es un diccionario válido")
                return False
        else:
            print(f"❌ Error obteniendo disponibilidad: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_calendar_availability_specific_date():
    """Prueba disponibilidad para una fecha específica"""
    print("🧪 Probando disponibilidad para fecha específica...")
    
    try:
        # Probar con mañana
        tomorrow = datetime.now() + timedelta(days=1)
        date_str = tomorrow.strftime("%Y-%m-%d")
        
        response = requests.get(f"{API_BASE}/calendar/availability/{date_str}")
        
        if response.status_code == 200:
            availability = response.json()
            if isinstance(availability, dict):
                print(f"✅ Disponibilidad obtenida para {date_str}")
                if 'available' in availability:
                    print(f"   Disponible: {availability['available']}")
                return True
            else:
                print("❌ Respuesta no es un diccionario válido")
                return False
        else:
            print(f"❌ Error obteniendo disponibilidad: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_create_reservation():
    """Prueba crear una reserva"""
    print("🧪 Probando creación de reserva...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    # Crear reserva para mañana
    tomorrow = datetime.now() + timedelta(days=1)
    reservation_data = {
        "date": tomorrow.strftime("%Y-%m-%d"),
        "time_slot": "10:00-12:00",
        "number_of_people": 5,
        "special_requests": "Test reservation - birthday party"
    }
    
    try:
        response = requests.post(f"{API_BASE}/reservations", json=reservation_data, headers=headers)
        
        if response.status_code == 201:
            reservation = response.json()
            print("✅ Reserva creada exitosamente")
            print(f"   ID: {reservation.get('id')}")
            print(f"   Fecha: {reservation.get('date')}")
            return True
        else:
            print(f"❌ Error creando reserva: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_get_user_reservations():
    """Prueba obtener reservas del usuario"""
    print("🧪 Probando obtener reservas del usuario...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    try:
        response = requests.get(f"{API_BASE}/reservations", headers=headers)
        
        if response.status_code == 200:
            reservations = response.json()
            if isinstance(reservations, list):
                print(f"✅ Reservas obtenidas: {len(reservations)} reservas")
                for res in reservations[:3]:  # Mostrar primeras 3
                    print(f"   - {res.get('date')} {res.get('time_slot')}")
                return True
            else:
                print("❌ La respuesta no es una lista válida")
                return False
        else:
            print(f"❌ Error obteniendo reservas: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_update_reservation():
    """Prueba actualizar una reserva"""
    print("🧪 Probando actualización de reserva...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    # Primero obtener las reservas del usuario
    try:
        response = requests.get(f"{API_BASE}/reservations", headers=headers)
        if response.status_code != 200:
            print("❌ No se pudieron obtener las reservas")
            return False
        
        reservations = response.json()
        if not reservations:
            print("❌ No hay reservas para actualizar")
            return False
        
        # Tomar la primera reserva
        reservation_id = reservations[0]['id']
        
        # Actualizar la reserva
        update_data = {
            "number_of_people": 8,
            "special_requests": "Updated reservation - more people"
        }
        
        response = requests.put(
            f"{API_BASE}/reservations/{reservation_id}", 
            json=update_data, 
            headers=headers
        )
        
        if response.status_code == 200:
            updated_reservation = response.json()
            print("✅ Reserva actualizada exitosamente")
            print(f"   Nueva cantidad: {updated_reservation.get('number_of_people')}")
            return True
        else:
            print(f"❌ Error actualizando reserva: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_delete_reservation():
    """Prueba eliminar una reserva"""
    print("🧪 Probando eliminación de reserva...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    try:
        # Primero obtener las reservas del usuario
        response = requests.get(f"{API_BASE}/reservations", headers=headers)
        if response.status_code != 200:
            print("❌ No se pudieron obtener las reservas")
            return False
        
        reservations = response.json()
        if not reservations:
            print("❌ No hay reservas para eliminar")
            return False
        
        # Tomar la última reserva para eliminar
        reservation_id = reservations[-1]['id']
        
        # Eliminar la reserva
        response = requests.delete(f"{API_BASE}/reservations/{reservation_id}", headers=headers)
        
        if response.status_code == 200:
            print("✅ Reserva eliminada exitosamente")
            return True
        else:
            print(f"❌ Error eliminando reserva: {response.status_code}")
            print(f"Respuesta: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión - Asegúrate que el servidor está corriendo")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False

def test_invalid_reservation():
    """Prueba crear reserva con datos inválidos"""
    print("🧪 Probando creación de reserva inválida...")
    
    user_token = get_user_token()
    if not user_token:
        print("❌ No se pudo obtener token de usuario")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    
    # Reserva con fecha en el pasado
    past_date = datetime.now() - timedelta(days=1)
    invalid_reservation = {
        "date": past_date.strftime("%Y-%m-%d"),
        "time_slot": "10:00-12:00",
        "number_of_people": -5,  # Número inválido
        "special_requests": "Invalid reservation"
    }
    
    try:
        response = requests.post(f"{API_BASE}/reservations", json=invalid_reservation, headers=headers)
        
        if response.status_code == 400:
            print("✅ Reserva inválida rechazada correctamente")
            return True
        else:
            print(f"❌ Error: debería ser 400, recibido {response.status_code}")
            print(f"Respuesta: {response.text}")
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
    print("📅 TESTS DE CALENDARIO Y RESERVAS")
    print("=" * 60)
    
    tests = [
        ("Disponibilidad Mes", test_calendar_availability),
        ("Disponibilidad Fecha", test_calendar_availability_specific_date),
        ("Crear Reserva", test_create_reservation),
        ("Obtener Reservas", test_get_user_reservations),
        ("Actualizar Reserva", test_update_reservation),
        ("Eliminar Reserva", test_delete_reservation),
        ("Reserva Inválida", test_invalid_reservation)
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
        print(f"{test_name:20} - {status}")
        if result:
            passed += 1
    
    print(f"\n🎯 Resultado: {passed}/{total} pruebas pasaron")
    
    if passed == total:
        print("🎉 ¡Todas las pruebas de calendario pasaron!")
        return True
    else:
        print("⚠️  Algunas pruebas fallaron - Revisa los errores above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
