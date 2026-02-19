# Indiana Bill Gijón - Sitio Web Oficial

Sitio web moderno para Indiana Bill, la ludoteca más grande de Gijón. Desarrollado con React (Vite) en el frontend y Django en el backend.

## 🎪 Características

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Django REST Framework
- **Diseño Responsivo**: Adaptado para todos los dispositivos
- **SEO Optimizado**: Meta etiquetas y estructura semántica
- **Galería de Imágenes**: Fondos personalizados con filtros
- **Video Integrado**: YouTube embed para presentación
- **Navegación Moderna**: React Router con enlaces activos

## 📋 Requisitos Previos

- Node.js 18+ 
- Python 3.9+
- npm o yarn
- Git

## 🚀 Instalación y Despliegue

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd indianabill
```

### 2. Configurar el Backend

```bash
# Entrar a la carpeta del backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Realizar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Iniciar servidor de desarrollo
python manage.py runserver
```

### 3. Configurar el Frontend

```bash
# Abrir nueva terminal, entrar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# Iniciar servidor de desarrollo
npm run dev
```

### 4. Acceder a la Aplicación

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Admin de Django: http://localhost:8000/admin

## 🌐 Despliegue en Producción

### Opción 1: Vercel (Frontend) + Railway/Heroku (Backend)

#### Frontend en Vercel

1. **Preparar el proyecto para producción:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Desplegar en Vercel:**
   - Crear cuenta en [vercel.com](https://vercel.com)
   - Conectar el repositorio de GitHub
   - Configurar variables de entorno:
     - `VITE_API_URL`: URL de tu backend en producción
   - Hacer deploy automático

#### Backend en Railway

1. **Preparar Django para producción:**
   ```bash
   cd backend
   pip install gunicorn whitenoise
   ```

2. **Configurar `settings.py` para producción:**
   ```python
   STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
   STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
   ```

3. **Desplegar en Railway:**
   - Crear cuenta en [railway.app](https://railway.app)
   - Importar el proyecto desde GitHub
   - Configurar variables de entorno
   - Railway hará deploy automático

### Opción 2: Netlify + Render

Similar al proceso anterior pero usando:
- **Netlify** para el frontend
- **Render** para el backend

### Opción 3: VPS Propio (DigitalOcean, Vultr, etc.)

1. **Configurar el servidor:**
   ```bash
   # Instalar Nginx
   sudo apt update
   sudo apt install nginx

   # Instalar Node.js y Python
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt install python3 python3-pip
   ```

2. **Configurar Nginx para frontend:**
   ```nginx
   server {
       listen 80;
       server_name tudominio.com;
       
       location / {
           root /ruta/al/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       location /api/ {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

3. **Configurar Systemd para backend:**
   ```ini
   [Unit]
   Description=Indiana Bill Backend
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/ruta/al/backend
   ExecStart=/ruta/al/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 backend.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```

## 🔧 Variables de Entorno

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
DEBUG=False
SECRET_KEY=tu-clave-secreta-aqui
ALLOWED_HOSTS=tu-dominio.com,www.tu-dominio.com
```

## 📁 Estructura del Proyecto

```
indianabill/
├── frontend/                 # Aplicación React
│   ├── public/              # Archivos estáticos
│   ├── src/                 # Código fuente
│   ├── package.json         # Dependencias
│   └── vite.config.js       # Configuración de Vite
├── backend/                 # Aplicación Django
│   ├── manage.py           # Gestión de Django
│   ├── requirements.txt    # Dependencias Python
│   └── tu_app/             # Módulos de la aplicación
├── README.md               # Este archivo
└── .gitignore             # Archivos ignorados por Git
```

## 🎨 Personalización

### Cambiar Colores y Estilos
Los colores principales están definidos en `frontend/src/index.css`:
```css
:root {
  --color-green: #00A851;
  --color-black: #111111;
  /* ... otros colores */
}
```

### Modificar Contenido
- **Texto del hero**: `frontend/src/components/HeroSection.jsx`
- **Servicios**: Backend API + `frontend/src/components/ServiceCard.jsx`
- **Footer**: `frontend/src/components/Footer.jsx`

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de CORS en desarrollo:**
   - Asegúrate que el backend tenga configurado CORS
   - Instala `django-cors-headers` si es necesario

2. **Variables de entorno no funcionan:**
   - Reinicia el servidor después de cambiar .env
   - Verifica que el archivo .env esté en la carpeta correcta

3. **Build falla:**
   - Verifica que todas las dependencias estén instaladas
   - Limpia la caché: `npm cache clean --force`

## 📞 Soporte

Si tienes problemas durante el despliegue:

1. Revisa los logs del servidor
2. Verifica las variables de entorno
3. Asegúrate que las versiones de Node.js y Python sean compatibles
4. Consulta la documentación oficial de [React](https://react.dev/) y [Django](https://docs.djangoproject.com/)

## 📄 Licencia

© 2024 Indiana Bill Gijón. Todos los derechos reservados.
