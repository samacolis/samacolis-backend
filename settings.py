import os
from pathlib import Path
from datetime import timedelta

# 1. Chemin racine du projet
BASE_DIR = Path(__file__).resolve().parent.parent

# 2. Clé secrète — change-la absolument pour la prod !
SECRET_KEY = 'l$=wrkssah)4hy=%lmme4^d%7+#b1ka61k0oy^ytd&4^t1fyks'

# 3. Mode debug
DEBUG = True

# 4. Hôtes autorisés
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'samacolis-backend-mlmniww74-samacolis-projects.vercel.app',      # ← remplace par TON domaine back-end Vercel
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pages',
    'accounts',
]
 

    # 3rd-party
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',

    # tiennes
    'api',
]

# 6. Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',           # doit être tout en haut
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'samacolis.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # ajoute ici tes templates si besoin
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'samacolis.wsgi.application'

# 7. Base de données (SQLite en dev)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# 8. Password validation (par défaut)
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 9. Internationalisation
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# 10. Fichiers statiques
STATIC_URL = '/static/'

import os
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'pages/static'),
]

# 11. CORS
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://samacolis-backend.vercel.app/',  # ← remplace par TON domaine front-end Vercel
]

# 12. DRF + Simple JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',)
}

AUTH_USER_MODEL = 'accounts.CustomUser'

