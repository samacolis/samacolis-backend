from django.contrib import admin
from .models import Client, Colis

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'telephone', 'email', 'created_at')
    search_fields = ('nom', 'prenom', 'email')

@admin.register(Colis)
class ColisAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'statut_courant', 'date_depot')
    list_filter = ('statut_courant', 'destination')
    search_fields = ('id', 'client__nom')
