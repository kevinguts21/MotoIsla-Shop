set -o errexit 

pip install -r requirements.txt

python manage.py migrate  # 🔴 Primero migra la base de datos

python manage.py collectstatic --noinput  # 🔵 Luego recopila archivos estáticos



#if [[ "$CREATE_SUPERUSER" == "True" ]]; then
#    python manage.py createsuperuser --no-input
#fi

