#!/usr/bin/env python3
"""
run_all_tests.py - Script principal para ejecutar todas las pruebas
Ejecuta todos los tests y muestra un resumen completo
"""

import sys
import os
import subprocess
import time
from datetime import datetime

# Añadir el directorio actual al path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def run_test_script(script_name):
    """Ejecuta un script de prueba y devuelve el resultado"""
    try:
        print(f"\n{'='*80}")
        print(f"🚀 EJECUTANDO: {script_name}")
        print(f"{'='*80}")
        
        start_time = time.time()
        
        # Ejecutar el script
        result = subprocess.run(
            [sys.executable, script_name], 
            capture_output=True, 
            text=True,
            cwd=os.path.dirname(os.path.abspath(__file__))
        )
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Mostrar salida
        if result.stdout:
            print(result.stdout)
        
        if result.stderr:
            print("⚠️  STDERR:")
            print(result.stderr)
        
        # Determinar resultado
        success = result.returncode == 0
        
        print(f"\n⏱️  Tiempo de ejecución: {duration:.2f} segundos")
        print(f"📊 Resultado: {'✅ EXITO' if success else '❌ FALLO'}")
        
        return success, duration, result.stdout, result.stderr
        
    except Exception as e:
        print(f"❌ Error ejecutando {script_name}: {e}")
        return False, 0, "", str(e)

def check_server_status():
    """Verifica si el servidor está corriendo"""
    print("🔍 Verificando estado del servidor...")
    
    try:
        import requests
        response = requests.get("http://localhost:8000", timeout=5)
        if response.status_code == 200:
            print("✅ Servidor corriendo correctamente")
            return True
        else:
            print(f"⚠️  Servidor respondió con código {response.status_code}")
            return True  # Aún así está corriendo
    except requests.exceptions.ConnectionError:
        print("❌ Servidor no está corriendo - Algunas pruebas fallarán")
        print("💡 Inicia el servidor con: python run.py")
        return False
    except Exception as e:
        print(f"❌ Error verificando servidor: {e}")
        return False

def main():
    """Función principal"""
    print("🧪 SUITE COMPLETA DE PRUEBAS - INDIANA BILL")
    print("=" * 80)
    print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    # Verificar servidor
    server_running = check_server_status()
    
    # Lista de tests a ejecutar
    test_scripts = [
        "test_database.py",
        "test_auth.py", 
        "test_user_management.py",
        "test_calendar.py"
    ]
    
    # Ejecutar todos los tests
    results = []
    total_start_time = time.time()
    
    for script in test_scripts:
        success, duration, stdout, stderr = run_test_script(script)
        results.append({
            'script': script,
            'success': success,
            'duration': duration,
            'stdout': stdout,
            'stderr': stderr
        })
    
    total_end_time = time.time()
    total_duration = total_end_time - total_start_time
    
    # Resumen final
    print(f"\n{'='*80}")
    print("📊 RESUMEN COMPLETO DE PRUEBAS")
    print(f"{'='*80}")
    
    passed = 0
    total = len(results)
    
    for result in results:
        status = "✅ PASÓ" if result['success'] else "❌ FALLÓ"
        duration_str = f"({result['duration']:.2f}s)"
        print(f"{result['script']:25} - {status:10} {duration_str}")
        if result['success']:
            passed += 1
    
    print(f"\n🎯 Resultado Global: {passed}/{total} suites pasaron")
    print(f"⏱️  Tiempo total: {total_duration:.2f} segundos")
    
    # Advertencias
    if not server_running:
        print("\n⚠️  ADVERTENCIA: El servidor no estaba corriendo")
        print("   Algunos tests de API pueden haber fallado")
    
    # Recomendaciones
    if passed < total:
        print("\n💡 RECOMENDACIONES:")
        print("   - Revisa los errores detallados above")
        print("   - Asegúrate que el servidor está corriendo")
        print("   - Verifica que la base de datos existe")
        print("   - Ejuta los scripts individuales para más detalles")
    
    # Estado final
    print(f"\n{'='*80}")
    if passed == total:
        print("🎉 ¡TODAS LAS PRUEBAS PASARON!")
        print("✅ El sistema está funcionando correctamente")
    else:
        print("⚠️  ALGUNAS PRUEBAS FALLARON")
        print("🔧 Requiere atención y posibles correcciones")
    print(f"{'='*80}")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
