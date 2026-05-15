#!/usr/bin/env python3
"""
test_database.py - Script para probar la conexión y operaciones de base de datos
Prueba la integridad de la base de datos y operaciones básicas
"""

import sys
import os
import sqlite3
import tempfile
import shutil

# Añadir el directorio padre al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine, SessionLocal, Base
from app.models.user import User, UserRole
from app.models.reservation import Reservation

def test_database_connection():
    """Prueba la conexión a la base de datos"""
    print("🧪 Probando conexión a la base de datos...")
    
    try:
        # Intentar conectar y hacer una consulta simple
        db = SessionLocal()
        result = db.execute("SELECT 1").fetchone()
        db.close()
        
        if result and result[0] == 1:
            print("✅ Conexión a base de datos exitosa")
            return True
        else:
            print("❌ Error en consulta de prueba")
            return False
            
    except Exception as e:
        print(f"❌ Error conectando a la base de datos: {e}")
        return False

def test_database_tables():
    """Prueba que las tablas existan"""
    print("🧪 Probando existencia de tablas...")
    
    try:
        db = SessionLocal()
        
        # Verificar tabla de usuarios
        result = db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").fetchone()
        if not result:
            print("❌ Tabla 'users' no encontrada")
            return False
        
        # Verificar tabla de reservas
        result = db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='reservations'").fetchone()
        if not result:
            print("❌ Tabla 'reservations' no encontrada")
            return False
        
        print("✅ Tablas requeridas encontradas")
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Error verificando tablas: {e}")
        return False

def test_user_crud():
    """Prueba operaciones CRUD de usuarios"""
    print("🧪 Probando operaciones CRUD de usuarios...")
    
    try:
        db = SessionLocal()
        
        # CREATE - Crear usuario de prueba
        test_user = User(
            username="test_db_user",
            email="test_db@example.com",
            hashed_password="hashed_password_test",
            role=UserRole.USER,
            description="Usuario de prueba para DB"
        )
        
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        if not test_user.id:
            print("❌ Error creando usuario")
            db.close()
            return False
        
        print("✅ Usuario creado")
        
        # READ - Leer usuario
        user = db.query(User).filter(User.username == "test_db_user").first()
        if not user or user.username != "test_db_user":
            print("❌ Error leyendo usuario")
            db.close()
            return False
        
        print("✅ Usuario leído")
        
        # UPDATE - Actualizar usuario
        user.description = "Descripción actualizada"
        db.commit()
        
        updated_user = db.query(User).filter(User.username == "test_db_user").first()
        if updated_user.description != "Descripción actualizada":
            print("❌ Error actualizando usuario")
            db.close()
            return False
        
        print("✅ Usuario actualizado")
        
        # DELETE - Eliminar usuario
        db.delete(user)
        db.commit()
        
        deleted_user = db.query(User).filter(User.username == "test_db_user").first()
        if deleted_user:
            print("❌ Error eliminando usuario")
            db.close()
            return False
        
        print("✅ Usuario eliminado")
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Error en operaciones CRUD: {e}")
        try:
            db.close()
        except:
            pass
        return False

def test_reservation_crud():
    """Prueba operaciones CRUD de reservas"""
    print("🧪 Probando operaciones CRUD de reservas...")
    
    try:
        db = SessionLocal()
        
        # Primero crear un usuario para la reserva
        test_user = User(
            username="test_reservation_user",
            email="test_res@example.com",
            hashed_password="hashed_password_test",
            role=UserRole.USER
        )
        
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        
        # CREATE - Crear reserva
        from datetime import datetime, timedelta
        tomorrow = datetime.now() + timedelta(days=1)
        
        test_reservation = Reservation(
            user_id=test_user.id,
            date=tomorrow.date(),
            time_slot="10:00-12:00",
            number_of_people=5,
            special_requests="Reserva de prueba",
            status="confirmed"
        )
        
        db.add(test_reservation)
        db.commit()
        db.refresh(test_reservation)
        
        if not test_reservation.id:
            print("❌ Error creando reserva")
            db.close()
            return False
        
        print("✅ Reserva creada")
        
        # READ - Leer reserva
        reservation = db.query(Reservation).filter(Reservation.id == test_reservation.id).first()
        if not reservation or reservation.user_id != test_user.id:
            print("❌ Error leyendo reserva")
            db.close()
            return False
        
        print("✅ Reserva leída")
        
        # UPDATE - Actualizar reserva
        reservation.number_of_people = 8
        reservation.special_requests = "Reserva actualizada"
        db.commit()
        
        updated_reservation = db.query(Reservation).filter(Reservation.id == test_reservation.id).first()
        if updated_reservation.number_of_people != 8:
            print("❌ Error actualizando reserva")
            db.close()
            return False
        
        print("✅ Reserva actualizada")
        
        # DELETE - Eliminar reserva y usuario
        db.delete(reservation)
        db.delete(test_user)
        db.commit()
        
        deleted_reservation = db.query(Reservation).filter(Reservation.id == test_reservation.id).first()
        if deleted_reservation:
            print("❌ Error eliminando reserva")
            db.close()
            return False
        
        print("✅ Reserva eliminada")
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Error en operaciones CRUD de reservas: {e}")
        try:
            db.close()
        except:
            pass
        return False

def test_foreign_key_constraints():
    """Prueba las restricciones de clave foránea"""
    print("🧪 Probando restricciones de clave foránea...")
    
    try:
        db = SessionLocal()
        
        # Intentar crear una reserva con un user_id que no existe
        from datetime import datetime, timedelta
        tomorrow = datetime.now() + timedelta(days=1)
        
        invalid_reservation = Reservation(
            user_id=99999,  # ID que no existe
            date=tomorrow.date(),
            time_slot="10:00-12:00",
            number_of_people=5,
            status="confirmed"
        )
        
        db.add(invalid_reservation)
        
        try:
            db.commit()
            print("❌ Error: Se permitió crear reserva con user_id inválido")
            db.close()
            return False
        except Exception:
            # Esto es lo que esperamos - que falle por la restricción de clave foránea
            db.rollback()
            print("✅ Restricción de clave foránea funcionando correctamente")
            db.close()
            return True
        
    except Exception as e:
        print(f"❌ Error verificando restricciones: {e}")
        try:
            db.close()
        except:
            pass
        return False

def test_data_integrity():
    """Prueba la integridad de los datos"""
    print("🧪 Probando integridad de datos...")
    
    try:
        db = SessionLocal()
        
        # Verificar que todos los usuarios tengan los campos requeridos
        users = db.query(User).all()
        for user in users:
            if not user.username or not user.email or not user.hashed_password or not user.role:
                print(f"❌ Usuario {user.id} incompleto")
                db.close()
                return False
        
        print(f"✅ {len(users)} usuarios con datos completos")
        
        # Verificar que todas las reservas tengan los campos requeridos
        reservations = db.query(Reservation).all()
        for reservation in reservations:
            if not reservation.user_id or not reservation.date or not reservation.time_slot:
                print(f"❌ Reserva {reservation.id} incompleta")
                db.close()
                return False
        
        print(f"✅ {len(reservations)} reservas con datos completos")
        
        # Verificar que las reservas tengan usuarios válidos
        for reservation in reservations:
            user = db.query(User).filter(User.id == reservation.user_id).first()
            if not user:
                print(f"❌ Reserva {reservation.id} con usuario inválido")
                db.close()
                return False
        
        print("✅ Todas las reservas tienen usuarios válidos")
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Error verificando integridad: {e}")
        try:
            db.close()
        except:
            pass
        return False

def test_database_backup():
    """Prueba crear una copia de seguridad de la base de datos"""
    print("🧪 Probando copia de seguridad de la base de datos...")
    
    try:
        # Obtener la ruta de la base de datos actual
        db_path = "indianabill.db"
        if not os.path.exists(db_path):
            print("❌ No se encontró la base de datos")
            return False
        
        # Crear copia de seguridad
        backup_path = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.db"
        shutil.copy2(db_path, backup_path)
        
        if os.path.exists(backup_path):
            # Verificar que la copia sea válida
            conn = sqlite3.connect(backup_path)
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM users")
            user_count = cursor.fetchone()[0]
            cursor.execute("SELECT COUNT(*) FROM reservations")
            reservation_count = cursor.fetchone()[0]
            conn.close()
            
            # Limpiar archivo de backup
            os.remove(backup_path)
            
            print(f"✅ Copia de seguridad creada ({user_count} usuarios, {reservation_count} reservas)")
            return True
        else:
            print("❌ No se pudo crear la copia de seguridad")
            return False
        
    except Exception as e:
        print(f"❌ Error creating backup: {e}")
        return False

def main():
    """Función principal que ejecuta todas las pruebas"""
    print("=" * 60)
    print("🗄️  TESTS DE BASE DE DATOS")
    print("=" * 60)
    
    tests = [
        ("Conexión BD", test_database_connection),
        ("Tablas BD", test_database_tables),
        ("CRUD Usuarios", test_user_crud),
        ("CRUD Reservas", test_reservation_crud),
        ("Claves Foráneas", test_foreign_key_constraints),
        ("Integridad Datos", test_data_integrity),
        ("Copia Seguridad", test_database_backup)
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
        print("🎉 ¡Todas las pruebas de base de datos pasaron!")
        return True
    else:
        print("⚠️  Algunas pruebas fallaron - Revisa los errores above")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
