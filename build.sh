set -o errexit  # Detiene el script si hay un error

pip install -r requirements.txt  # Instala las dependencias

# Verificar que STATIC_ROOT esté configurado correctamente
if [ -z "$STATIC_ROOT" ]; then
    echo "⚠️ Warning: STATIC_ROOT is not set. Setting it manually..."
    export STATIC_ROOT="staticfiles"
fi

python manage.py collectstatic --no-input || echo "⚠️ Warning: collectstatic failed, skipping..."

# 🚀 Verificar si DATABASE_URL está configurada antes de continuar
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL no está definida en Render."
    exit 1
fi

python manage.py migrate  # Aplica migraciones
