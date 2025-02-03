from pathlib import Path
import os
import dj_database_url
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv

# 📌 Cargar variables de entorno desde .env
load_dotenv()

# 📌 BASE_DIR: Ruta base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# 📌 Seguridad: Se obtiene de variable de entorno para producción
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-default-key")

# 📌 Modo Debug: True en local, False en producción
DEBUG = os.getenv("DEBUG", "True") == "True"

# 📌 Hosts permitidos: Se cargan desde variable de entorno
ALLOWED_HOSTS = [
    "localhost",  # Para desarrollo local
    "127.0.0.1",  # Para desarrollo local
    "motoisla.onrender.com",  # Dominio del backend en Render
    "motoisla-reactjs.onrender.com",  # Dominio del frontend en Render
]
# 📌 Aplicaciones instaladas
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "shop",
    "cloudinary",
    "cloudinary_storage",
]

# 📌 Middleware
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],  # Directorio de plantillas (puedes cambiarlo)
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# 📌 CORS: Configuración para permitir solicitudes de React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://motoisla-reactjs.onrender.com",
]

CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
    "accept",
    "x-requested-with",
]

CSRF_TRUSTED_ORIGINS = [
    "https://motoisla.onrender.com",  # Backend en Render
    "https://motoisla-reactjs.onrender.com",  # Frontend en Render
]


# 📌 URLs y WSGI
ROOT_URLCONF = "motoisla.urls"
WSGI_APPLICATION = "motoisla.wsgi.application"

# 📌 Configuración de la base de datos (SQLite para desarrollo, PostgreSQL en producción)
DATABASE_URL = os.getenv("DATABASE_URL", "")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL, conn_max_age=600, ssl_require=True
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# 📌 Validaciones de contraseña
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# 📌 Configuración de idioma y zona horaria
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# 📌 Configuración de archivos estáticos y de medios
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# 📌 Configuración de Cloudinary (para producción)
if not DEBUG:  # Solo usar en producción
    CLOUDINARY_STORAGE = {
        "CLOUD_NAME": os.getenv("CLOUDINARY_CLOUD_NAME"),
        "API_KEY": os.getenv("CLOUDINARY_API_KEY"),
        "API_SECRET": os.getenv("CLOUDINARY_API_SECRET"),
    }
    DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# 📌 ID automático para nuevos modelos
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
