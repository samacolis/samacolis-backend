# # Dockerfile – utilise requirements.txt pour les dépendances

FROM python:3.11-slim

WORKDIR /app

# 1️⃣ Copier le fichier de dépendances et installer
COPY requirements.txt /app/
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# 2️⃣ Copier le code source
COPY . /app/

# 3️⃣ Exposer le port de l'application
EXPOSE 8000

# 4️⃣ Démarrer avec Gunicorn
CMD ["gunicorn", "samacolis.wsgi:application", "--bind", "0.0.0.0:8000"]

