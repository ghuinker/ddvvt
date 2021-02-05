#! /bin/bash
# This is a very rudementary deploy script please don't use this in prod
if [ $# -ne 1 ]; then
    echo "Need args: branch"
    exit 3
fi

git pull origin $1 || exit 3

pip3 install -r requirements.txt

python3 manage.py migrate

yarn install
yarn build

python3 manage.py collectstatic --noinput

sudo systemctl restart gunicorn