from django.conf import settings
from django.db import models
import uuid
from django.contrib.auth import get_user_model # Importez get_user_model

class Client(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='client_profile', null=True, blank=True) # Lien vers le modèle utilisateur actif
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100, blank=True)
    prenom = models.CharField(max_length=100, blank=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=150)
    adresse = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Colis(models.Model):
    STATUT_CHOICES = [
        ('declare', 'Déclaré'),
        ('receptionne', 'Réceptionné'),
        ('en_attente', "En attente d'expédition"),
        ('expedie', 'Expédié'),
        ('livre', 'Livré'),
        ('probleme', 'Problème'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='colis')
    boutique = models.CharField(max_length=100, blank=True, null=True)
    numero_suivi = models.CharField(max_length=100, blank=True, null=True)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='assigned_colis'
    )
    poids_kg = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    longueur_cm = models.IntegerField(null=True, blank=True)
    largeur_cm = models.IntegerField(null=True, blank=True)
    hauteur_cm = models.IntegerField(null=True, blank=True)
    description = models.TextField()
    valeur_declaree = models.DecimalField(max_digits=10, decimal_places=2)
    destination = models.CharField(max_length=100)
    date_depot = models.DateField(null=True, blank=True)
    statut_courant = models.CharField(max_length=50, choices=STATUT_CHOICES, default='declare')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Colis {self.id} - {self.client.nom}"

class HistoriqueSuivi(models.Model):
    colis = models.ForeignKey(Colis, on_delete=models.CASCADE, related_name='historique_suivi')
    statut = models.CharField(max_length=50, choices=Colis.STATUT_CHOICES) # Reprend les choix de statut du Colis
    emplacement = models.CharField(max_length=255)
    date_heure = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['date_heure']
        verbose_name = "Historique de Suivi"
        verbose_name_plural = "Historiques de Suivi"

    def __str__(self):
        return f"Suivi Colis {self.colis.id} - {self.statut} à {self.emplacement}"