# Tests del Backend - Indiana Bill

Esta carpeta contiene scripts de prueba para verificar que todas las funcionalidades del backend funcionen correctamente.

## 📋 Estructura de Tests

### 🗄️ `test_database.py`
Prueba la conexión y operaciones de la base de datos:
- Conexión a SQLite
- Existencia de tablas
- Operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
- Restricciones de clave foránea
- Integridad de datos
- Copias de seguridad

### 🔐 `test_auth.py`
Prueba el sistema de autenticación:
- Registro de usuarios
- Inicio de sesión
- Validación de tokens
- Acceso a endpoints protegidos
- Manejo de credenciales inválidas

### 👥 `test_user_management.py`
Prueba la gestión de usuarios:
- Cambio de roles (solo admin)
- Listado de usuarios (solo admin)
- Eliminación de usuarios (solo admin)
- Permisos y restricciones por rol

### 📅 `test_calendar.py`
Prueba el sistema de calendario y reservas:
- Consulta de disponibilidad
- Creación de reservas
- Obtención de reservas del usuario
- Actualización de reservas
- Eliminación de reservas
- Validación de datos de reserva

### 🚀 `run_all_tests.py`
Script principal que ejecuta todos los tests:
- Ejecuta todas las suites de prueba
- Muestra resumen completo
- Mide tiempo de ejecución
- Verifica estado del servidor

## 🛠️ Cómo Usar

### Requisitos Previos
1. **Servidor corriendo**: Inicia el backend con `python run.py`
2. **Base de datos**: Asegúrate que `indianabill.db` existe
3. **Usuarios de prueba**: Ejecuta `python crear_usuarios.py crear`

### Ejecutar Todos los Tests
```bash
cd backend/test
python run_all_tests.py
```

### Ejecutar Tests Individuales
```bash
cd backend/test

# Base de datos
python test_database.py

# Autenticación
python test_auth.py

# Gestión de usuarios
python test_user_management.py

# Calendario y reservas
python test_calendar.py
```

## 📊 Resultados Esperados

### ✅ Tests Exitosos
- Todos los tests deberían mostrar "✅ PASÓ"
- El resumen final mostrará "🎉 ¡TODAS LAS PRUEBAS PASARON!"
- Tiempo total de ejecución: < 30 segundos

### ⚠️ Posibles Fallos
- **Servidor no corriendo**: Tests de API fallarán
- **Base de datos corrupta**: Tests de BD fallarán
- **Usuarios faltantes**: Tests de autenticación fallarán

## 🔧 Solución de Problemas

### Problemas Comunes
1. **"Error de conexión"**
   - Solución: Inicia el servidor con `python run.py`

2. **"Tabla no encontrada"**
   - Solución: Ejecuta `python migrate_database.py`

3. **"Usuario no existe"**
   - Solución: Ejecuta `python crear_usuarios.py crear`

4. **"Permiso denegado"**
   - Solución: Verifica permisos de archivos en Windows/Linux

### Depuración
- Ejecuta tests individualmente para ver errores detallados
- Revisa los logs del servidor
- Verifica el estado de la base de datos con SQLite Browser

## 📝 Notas Técnicas

### Usuarios de Prueba
Los tests usan estos usuarios (creados por `crear_usuarios.py`):
- `admin_indiana` / `admin123` (Administrador)
- `juan_usuario` / `usuario123` (Usuario normal)
- `maria_test` / `test123` (Usuario normal)

### Base de Datos
- Usa SQLite (`indianabill.db`)
- Tests crean y eliminan datos temporales
- No afectan datos existentes (excepto usuarios de prueba)

### Endpoints Probados
- `POST /auth/register` - Registro
- `POST /auth/login` - Login
- `GET /auth/me` - Validación token
- `GET /admin/users` - Listar usuarios (admin)
- `PUT /admin/users/{id}` - Cambiar rol (admin)
- `DELETE /admin/users/{id}` - Eliminar usuario (admin)
- `GET /calendar/availability/{year}/{month}` - Disponibilidad
- `POST /reservations` - Crear reserva
- `GET /reservations` - Listar reservas usuario
- `PUT /reservations/{id}` - Actualizar reserva
- `DELETE /reservations/{id}` - Eliminar reserva

## 🔄 Mantenimiento

### Agregar Nuevos Tests
1. Crea un nuevo script `test_nueva_funcionalidad.py`
2. Sigue el patrón de los tests existentes
3. Añádelo a `run_all_tests.py`
4. Actualiza este README

### Actualizar Tests
- Cuando agregues nuevas funcionalidades, crea tests correspondientes
- Cuando modifiques endpoints, actualiza los tests
- Revisa periódicamente que los tests pasen

## 📞 Soporte

Si tienes problemas con los tests:
1. Revisa esta documentación
2. Ejecuta `python run_all_tests.py` para diagnóstico completo
3. Contacta al equipo de desarrollo con los errores específicos
