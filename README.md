# Django Vue Tailwind Skeleton


Base project starter for Django, Vue and Tailwind! Custom user with email or username to login, reserved_usernames, and simple logging and debugging!

  - Vue3
  - TailwindCSS2
  - Django3...need i say more?

# Create your project

  ```sh
$ django-admin.py startproject --template=https://github.com/ghuinker/django-vue-tailwind-skeleton/archive/master.zip myproject
```
Useful commands/Initial setup
  ```sh
cd myproject
python3 -m venv .venv
pip3 install -r requirements.txt
cp .env.example .env
python -c "import secrets; print(secrets.token_urlsafe())"
yarn install
yarn dev
python3 manage.py migrate
python3 manage runserver
```