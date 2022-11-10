from {{project_name}}.config.settings import * # noqa

DJANGO_VITE_DEV_MODE = False

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '{{project_name}}_test',
        'USER': '{{project_name}}_u',
        'PASSWORD': 'secret',
        'HOST': 'db',
        'PORT': '5432',
    }
}

# Cache
# https://docs.djangoproject.com/en/3.1/topics/cache/#local-memory-caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.PyMemcacheCache',
        'LOCATION': 'cache:11211',
    }
}
