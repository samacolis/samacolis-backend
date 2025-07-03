from django.conf import settings
from django.db import models
import uuid

class Client(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    email = models.EmailField(max_length=150)
    adresse = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Colis(models.Model):
    STATUT_CHOICES = [
        ('receptionne', 'Réceptionné'),
        ('en_attente', "En attente d'expédition"),
        ('expedie', 'Expédié'),
        ('livre', 'Livré'),
        ('probleme', 'Problème'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='colis')
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='assigned_colis'
    )
    poids_kg = models.DecimalField(max_digits=6, decimal_places=2)
    longueur_cm = models.IntegerField()
    largeur_cm = models.IntegerField()
    hauteur_cm = models.IntegerField()
    description = models.TextField()
    valeur_declaree = models.DecimalField(max_digits=10, decimal_places=2)
    destination = models.CharField(max_length=100)
    date_depot = models.DateField()
    statut_courant = models.CharField(max_length=50, choices=STATUT_CHOICES, default='receptionne')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Colis {self.id} - {self.client.nom}"

