#!/usr/bin/env bash
PORT=8000
ADDRESS=0.0.0.0:${PORT}
python manage.py migrate --noinput
python manage.py collectstatic --noinput
export DJANGO_SETTINGS_MODULE=backend.settings
echo "DJANGO_SETTINGS_MODULE: $DJANGO_SETTINGS_MODULE"
gunicorn backend.wsgi:application --bind ${ADDRESS} --workers 4
echo "Gunicorn command: gunicorn backend.wsgi:application --bind ${ADDRESS} --workers 2"
# python manage.py runserver ${ADDRESS}
