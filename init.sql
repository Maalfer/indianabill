-- Script de inicialización para PostgreSQL en Docker
-- Este script se ejecuta automáticamente cuando el contenedor se inicia por primera vez

-- Asegurar que la base de datos está creada
-- (PostgreSQL ya la crea gracias a las variables de entorno POSTGRES_DB)

-- Opcional: Crear extensiones si las necesitas
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Opcional: Configurar codificación
-- SET client_encoding = 'UTF8';

-- Puedes agregar aquí tablas iniciales si lo necesitas
-- Aunque SQLAlchemy las creará automáticamente cuando inicies la aplicación
