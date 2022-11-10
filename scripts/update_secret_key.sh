#!/bin/sh

FILE=.env
source "venv/bin/activate"

if [ ! -f "$FILE" ]; then
    echo "$FILE does not exist."
    exit
fi

secret_key=$(python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")
sed -i '' "s/SECRET_KEY=/SECRET_KEY=$secret_key/g" $FILE
