# Configuración de PostgreSQL en Docker

Esta guía te ayudará a configurar tu proyecto Indiana Bill para usar PostgreSQL corriendo en Docker en lugar de SQLite.

## Prerrequisitos

- Docker y Docker Compose instalados
- Python 3.8+ y pip instalados
- Acceso a la terminal/comando línea

## Pasos de Configuración

### 1. Instalar Dependencias de Python

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo y personalízalo:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Configuración de base de datos PostgreSQL en Docker
DATABASE_URL="postgresql://postgres:password@localhost:5432/indianabill"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_DB="indianabill"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
```

> **Importante**: Cambia `password` por una contraseña segura.

### 3. Iniciar PostgreSQL con Docker

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL en segundo plano. Para verificar que está corriendo:

```bash
docker-compose ps
```

### 4. Crear Tablas en PostgreSQL

Inicia tu aplicación FastAPI. SQLAlchemy creará automáticamente las tablas:

```bash
cd backend
python run.py
```

O si prefieres usar uvicorn directamente:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. (Opcional) Migrar Datos Existentes de SQLite

Si tienes datos en SQLite que quieres migrar:

```bash
cd backend
python migrate_to_postgres.py
```

El script te guiará paso a paso en el proceso de migración.

## Verificación de Conexión

### Método 1: API Endpoint

Inicia la aplicación y visita:
```
http://localhost:8000/health
```

Deberías recibir una respuesta JSON indicando que la conexión es exitosa.

### Método 2: Script de Prueba

```bash
cd backend
python test_database.py
```

## Comandos Docker Útiles

```bash
# Ver logs de PostgreSQL
docker-compose logs postgres

# Entrar al contenedor PostgreSQL
docker-compose exec postgres psql -U postgres -d indianabill

# Detener PostgreSQL
docker-compose down

# Reiniciar PostgreSQL
docker-compose restart postgres

# Eliminar datos de PostgreSQL (cuidado: esto borra todo)
docker-compose down -v
```

## Configuración Avanzada

### Cambiar Puerto de PostgreSQL

Edita `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"  # Cambia 5432 por el puerto que prefieras
```

No olvides actualizar también el archivo `.env`.

### Persistencia de Datos

Los datos se guardan en un volumen Docker llamado `postgres_data`. 
Esto significa que los datos persisten incluso si reinicias el contenedor.

### Backup de Base de Datos

```bash
# Crear backup
docker-compose exec postgres pg_dump -U postgres indianabill > backup.sql

# Restaurar backup
docker-compose exec -T postgres psql -U postgres indianabill < backup.sql
```

## Solución de Problemas

### Error: "Connection refused"

1. Verifica que PostgreSQL esté corriendo: `docker-compose ps`
2. Verifica el puerto: `docker-compose logs postgres`
3. Confirma que el puerto en `.env` coincida con el de `docker-compose.yml`

### Error: "Authentication failed"

1. Verifica las credenciales en `.env`
2. Reinicia PostgreSQL: `docker-compose restart postgres`

### Error: "Database does not exist"

1. SQLAlchemy debería crear la base de datos automáticamente
2. Si no, créala manualmente: 
   ```bash
   docker-compose exec postgres createdb -U postgres indianabill
   ```

## Cambiar de Vuelta a SQLite

Si necesitas volver a SQLite, simplemente edita tu archivo `.env`:

```env
DATABASE_URL="sqlite:///./indianabill.db"
```

Y reinicia tu aplicación. No necesitas cambiar nada más.

## Soporte

Si tienes problemas, verifica:

1. Que Docker esté corriendo
2. Que las variables de entorno sean correctas
3. Que el driver `psycopg2-binary` esté instalado
4. Los logs de Docker: `docker-compose logs postgres`
