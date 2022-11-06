#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi
touch .env # Suppress django warnings
python3 manage.py migrate
echo "Collecting Static"
python3 manage.py collectstatic --no-input
exec "$@"
