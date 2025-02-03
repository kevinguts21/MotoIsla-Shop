import os
import dj_database_url
from .settings import *
import os

# Hosts permitidos en producción
ALLOWED_HOSTS = [
    os.environ.get("RENDER_EXTERNAL_HOSTNAME", "motoisla.onrender.com"),
    "motoisla-reactjs.onrender.com",
]

# Protección CSRF en producción
CSRF_TRUSTED_ORIGINS = [
    "https://" + os.environ.get("RENDER_EXTERNAL_HOSTNAME", "motoisla.onrender.com")
]

# Modo producción
DEBUG = False
SECRET_KEY = os.environ.get("SECRET_KEY", "default-secret-key")

# Middleware con Whitenoise para archivos estáticos
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # ✅ Necesario para archivos estáticos
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Configuración CORS (permitir solicitudes desde frontend en Render)
CORS_ALLOWED_ORIGINS = [
    "https://motoisla-reactjs.onrender.com",
]

# 📌 🔴 INTEGRACIÓN CON CLOUDINARY SOLO EN PRODUCCIÓN
INSTALLED_APPS += [
    "cloudinary",
    "cloudinary_storage",
    "whitenoise.runserver_nostatic"
]

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.environ.get("CLOUDINARY_CLOUD_NAME", ""),
    "API_KEY": os.environ.get("CLOUDINARY_API_KEY", ""),
    "API_SECRET": os.environ.get("CLOUDINARY_API_SECRET", ""),
}

# Usar Cloudinary para archivos subidos por los usuarios
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# 📌 🔴 CONFIGURACIÓN DE STATICFILES PARA PRODUCCIÓN
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",  # ✅ Cloudinary almacena imágenes en la nube
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# 📌 🔴 CONFIGURACIÓN DE LA BASE DE DATOS
DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True,  # ✅ Render requiere SSL para PostgreSQL
        )
    }
else:
    print("❌ ERROR: No se encontró DATABASE_URL en las variables de entorno.")
    DATABASES = {}  # Dejar vacío para evitar fallos
    
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
