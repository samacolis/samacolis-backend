from rest_framework import serializers
from accounts.models import CustomUser  # On importe CustomUser
from api.models import Client, Colis, HistoriqueSuivi
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate # Import authenticate

import logging

# Obtenez une instance du logger pour cette application
logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True) # Ajoutez ce champ pour le nom complet
    phone = serializers.CharField(source='client_profile.telephone', allow_null=True, required=False) # Ajout du champ téléphone
    adresse = serializers.CharField(source='client_profile.adresse', allow_null=True, required=False) # Ajout du champ adresse

    class Meta:
        model = CustomUser  # On utilise CustomUser
        fields = ('id', 'email', 'password', 'name', 'phone', 'adresse') # Incluez 'name', 'phone', 'adresse' ici

    def to_representation(self, instance):
        # Personnalise la sortie du serializer
        representation = super().to_representation(instance)
        representation['name'] = instance.get_full_name() or instance.email
        # Ajout des champs téléphone et adresse du profil client
        if hasattr(instance, 'client_profile') and instance.client_profile:
            representation['phone'] = instance.client_profile.telephone
            representation['adresse'] = instance.client_profile.adresse
        return representation

    def create(self, validated_data):
        name = validated_data.pop('name', '')
        email = validated_data['email']
        password = validated_data['password']

        user = CustomUser.objects.create_user(email=email, password=password)

        # Assurez-vous que first_name et last_name sont définis
        parts = name.split(' ', 1)
        user.first_name = parts[0] if parts else ''
        user.last_name = parts[1] if len(parts) > 1 else ''
        user.save()

        # Créez ou mettez à jour le profil Client associé
        Client.objects.get_or_create(
            user=user,
            defaults={'email': user.email, 'nom': user.first_name, 'prenom': user.last_name}
        )

        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)

        name = validated_data.get('name')
        if name is not None:
            parts = name.split(' ', 1)
            instance.first_name = parts[0] if parts else ''
            instance.last_name = parts[1] if len(parts) > 1 else ''
        instance.save()

        # Mettez à jour les champs du profil client associé
        client_profile, created = Client.objects.get_or_create(user=instance)
        client_profile.telephone = validated_data.get('phone', client_profile.telephone)
        client_profile.adresse = validated_data.get('adresse', client_profile.adresse)
        client_profile.save()

        return instance

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ColisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colis
        fields = ['id', 'client', 'boutique', 'numero_suivi', 'description', 'valeur_declaree', 'statut_courant', 'date_depot']
        read_only_fields = ('client',)

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            client_profile = user.client_profile
        except Client.DoesNotExist:
            logger.error(f"Erreur lors de la création du colis: Profil client non trouvé pour l'utilisateur {user.email}.")
            raise serializers.ValidationError({'detail': "Profil client non trouvé pour l'utilisateur connecté."})

        colis = Colis.objects.create(client=client_profile, **validated_data)
        return colis

class ColisDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colis
        fields = ['id', 'boutique', 'numero_suivi', 'description', 'statut_courant']

class HistoriqueSuiviSerializer(serializers.ModelSerializer):
    colis = ColisDetailSerializer(read_only=True) # Utilise le sérialiseur détaillé pour le colis

    class Meta:
        model = HistoriqueSuivi
        fields = '__all__'

from django.contrib.auth import get_user_model

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    username_field = 'email'

    def validate(self, attrs):
        # La méthode validate de la classe parente gérera l'authentification
        # en utilisant 'email' comme champ d'utilisateur grâce à username_field.
        data = super().validate(attrs)
        return data