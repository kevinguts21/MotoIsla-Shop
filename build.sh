set -o errexit  # Detiene el script si hay un error

pip install -r requirements.txt  # Instala las dependencias

# Verifica si STATIC_ROOT está configurado correctamente
python -c "import os; print('STATIC_ROOT:', os.getenv('STATIC_ROOT'))"

# Solo ejecutar collectstatic si STATIC_ROOT está configurado
if [ -n "$STATIC_ROOT" ]; then
    python manage.py collectstatic --no-input || echo "⚠️ Warning: collectstatic failed, skipping..."
else
    echo "⚠️ Warning: STATIC_ROOT is not set. Skipping collectstatic..."
fi

python manage.py migrate  # Aplica migraciones
