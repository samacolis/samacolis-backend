from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from api.models import Client, Colis
from api.serializers import ColisSerializer
from rest_framework.test import APIRequestFactory

CustomUser = get_user_model()

@override_settings(AUTH_USER_MODEL='accounts.CustomUser')
class ColisSerializerTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = CustomUser._default_manager.create_user(email='test@example.com', password='password123')
        self.client_profile = Client.objects.create(user=self.user, email=self.user.email, nom='Test', prenom='User')

        self.valid_payload = {
            'boutique': 'Amazon',
            'numero_suivi': 'TRK12345',
            'description': 'Livre et écouteurs',
            'valeur_declaree': 50.00,
            'poids_kg': 1.5,
            'longueur_cm': 20,
            'largeur_cm': 15,
            'hauteur_cm': 10,
            'destination': 'Sénégal',
        }

    def test_create_colis_success(self):
        request = self.factory.post('/colis/', self.valid_payload)
        serializer = ColisSerializer(data=self.valid_payload, context={'request': request})
        self.assertTrue(serializer.is_valid())
        colis = serializer.save()
        self.assertIsInstance(colis, Colis)
        self.assertEqual(colis.client, self.client_profile)
        self.assertEqual(colis.statut_courant, 'declare') # Vérifie le statut par défaut

    def test_create_colis_no_client_profile(self):
        # Créer un utilisateur sans profil client
        user_no_profile = CustomUser.objects.create_user(email='no_profile@example.com', password='password123')
        request = self.factory.post('/colis/', self.valid_payload)
        request.user = user_no_profile # Assigner l'utilisateur à la requête

        serializer = ColisSerializer(data=self.valid_payload, context={'request': request})
        # Le sérialiseur devrait être valide car la validation du client se fait dans la méthode create
        self.assertTrue(serializer.is_valid())

        with self.assertRaises(Client.DoesNotExist):
            serializer.save()