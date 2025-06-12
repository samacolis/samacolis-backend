# Dockerfile à la racine de ~/Desktop/samacolis

FROM python:3.11-slim
WORKDIR /app

# 1️⃣ Installe les dépendances via Poetry
COPY pyproject.toml poetry.lock /app/
RUN pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# 2️⃣ Copie tout le code source
COPY . /app/

# 3️⃣ Expose le port de l’application
EXPOSE 8000

# 4️⃣ Commande de démarrage (Gunicorn)
CMD ["gunicorn", "samacolis.wsgi:application", "--bind", "0.0.0.0:8000"]
