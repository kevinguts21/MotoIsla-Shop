import os
import dj_database_url
from .settings import *

# Hosts permitidos en producción
ALLOWED_HOSTS = [
    os.environ.get("RENDER_EXTERNAL_HOSTNAME", "motoisla.onrender.com"),
    "motoisla-reactjs.onrender.com"
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

# 📌 🔴 ERROR CORREGIDO: Configuración correcta de `STORAGES`
STORAGES = {
    "default": "django.core.files.storage.FileSystemStorage",
    "staticfiles": "whitenoise.storage.CompressedManifestStaticFilesStorage",
}

# 📌 🔴 ERROR CORREGIDO: Verificar si `DATABASE_URL` está definida
DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get("DATABASE_URL", ""), conn_max_age=600
    )
}
