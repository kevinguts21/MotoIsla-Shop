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

BASE_DIR = Path(__file__).resolve().parent.parent 

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
INSTALLED_APPS = [
    "whitenoise.runserver_nostatic",  # Asegura que Whitenoise maneje archivos estáticos
    "django.contrib.staticfiles",
    "cloudinary",
    "cloudinary_storage",
]


CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.environ.get("CLOUDINARY_CLOUD_NAME", ""),
    "API_KEY": os.environ.get("CLOUDINARY_API_KEY", ""),
    "API_SECRET": os.environ.get("CLOUDINARY_API_SECRET", ""),
}

# Usar Cloudinary para archivos subidos por los usuarios
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# 📌 🔴 CONFIGURACIÓN DE STATICFILES PARA PRODUCCIÓN
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage", 
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


# 📌 🔴 CONFIGURACIÓN DE LA BASE DE DATOS
DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get("DATABASE_URL", ""), conn_max_age=600
    )
}
