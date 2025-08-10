from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status, generics
from accounts.models import CustomUser
from api.models import Colis, HistoriqueSuivi
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.models import Client, Colis
from .serializers import ClientSerializer, ColisSerializer, UserSerializer, MyTokenObtainPairSerializer, HistoriqueSuiviSerializer # Assurez-vous que UserSerializer est défini
from rest_framework_simplejwt.views import TokenObtainPairView
from api.throttles import LoginRateThrottle # Importez votre throttle
from api.permissions import IsTransporteur, IsClient # Importez vos permissions personnalisées

from rest_framework.views import APIView
from django.utils import timezone

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            user = CustomUser.objects.get(email_verification_token=token)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Jeton de vérification invalide ou expiré.'}, status=status.HTTP_400_BAD_REQUEST)

        if user.email_token_expires < timezone.now():
            return Response({'detail': 'Jeton de vérification expiré.'}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.is_verified = True
        user.email_verification_token = None # Supprimer le jeton après utilisation
        user.email_token_expires = None
        user.save()

        # Créer le profil Client associé si ce n'est pas déjà fait
        if not hasattr(user, 'client_profile') or not user.client_profile:
            Client.objects.create(user=user, email=user.email, nom=user.first_name, prenom=user.last_name)

        return Response({'detail': 'Votre compte a été vérifié avec succès. Vous pouvez maintenant vous connecter.'}, status=status.HTTP_200_OK)

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print("Serializer Errors:", serializer.errors) # Ajout de cette ligne
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save() # Sauvegarde l'utilisateur (is_active=False par défaut)

        # Envoyer l'email de vérification
        subject = 'Vérifiez votre adresse email pour SamaColis'
        html_message = render_to_string('email/verification_email.html', {'user': user, 'token': user.email_verification_token})
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = user.email

        send_mail(subject, plain_message, from_email, [to_email], html_message=html_message)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    throttle_classes = [LoginRateThrottle] # Appliquez la throttle ici

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().prefetch_related('colis')
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class ColisViewSet(viewsets.ModelViewSet):
    queryset = Colis.objects.all()
    serializer_class = ColisSerializer
    # Définir les permissions pour ColisViewSet
    # Les admins peuvent tout faire
    # Les transporteurs peuvent voir et modifier les colis qui leur sont assignés
    # Les clients peuvent voir et créer leurs propres colis

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            # Tous les utilisateurs authentifiés peuvent lister et récupérer
            permission_classes = [IsAuthenticated]
        elif self.action == 'create':
            # Seuls les clients peuvent créer des colis
            permission_classes = [IsAuthenticated, IsClient]
        elif self.action == 'update' or self.action == 'partial_update':
            # Les admins peuvent tout modifier
            # Les transporteurs peuvent modifier les colis qui leur sont assignés
            permission_classes = [IsAuthenticated, (IsTransporteur | IsAdminUser)]
        elif self.action == 'destroy':
            # Seuls les admins peuvent supprimer
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated] # Par défaut
        return [permission() for permission in permission_classes]

    def get_serializer_context(self):
        # On passe le contexte de la requête au serializer
        return {'request': self.request}

    def get_queryset(self):
        user = self.request.user
        # Admins voient tous les colis
        if user.is_staff:
            return Colis.objects.all()
        # Transporteurs ne voient que leurs colis assignés
        if user.groups.filter(name='Transporteurs').exists():
            return Colis.objects.filter(assigned_to=user)
        # Les autres utilisateurs (clients) voient leurs propres colis
        try:
            client_profile = user.client_profile
            return Colis.objects.filter(client=client_profile).select_related('client')
        except Client.DoesNotExist:
            return Colis.objects.none()

class HistoriqueSuiviViewSet(viewsets.ModelViewSet):
    queryset = HistoriqueSuivi.objects.all()
    serializer_class = HistoriqueSuiviSerializer
    # Définir les permissions pour HistoriqueSuiviViewSet
    # Les admins peuvent tout faire
    # Les transporteurs peuvent créer et modifier l'historique
    # Les clients peuvent seulement voir leur historique

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            # Tous les utilisateurs authentifiés peuvent lister et récupérer
            permission_classes = [IsAuthenticated]
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            # Seuls les admins et transporteurs peuvent créer/modifier l'historique
            permission_classes = [IsAuthenticated, (IsTransporteur | IsAdminUser)]
        elif self.action == 'destroy':
            # Seuls les admins peuvent supprimer
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated] # Par défaut
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        # Permettre aux admins de voir tout l'historique
        if self.request.user.is_staff:
            return HistoriqueSuivi.objects.all().select_related('colis')
        # Les clients ne voient que l'historique de leurs propres colis
        try:
            client_profile = self.request.user.client_profile
            return HistoriqueSuivi.objects.filter(colis__client=client_profile).select_related('colis', 'colis__client')
        except Client.DoesNotExist:
            return HistoriqueSuivi.objects.none()

from django.views.decorators.cache import cache_page

@api_view(['GET'])
@permission_classes([AllowAny])
@cache_page(60 * 1) # Cache la réponse pendant 60 secondes
def track_colis(request, id):
    """
    Endpoint public pour suivre un colis par son UUID.
    """
    try:
        colis = Colis.objects.get(id=id)
    except Colis.DoesNotExist:
        return Response(
            {'detail': 'Colis non trouvé'},
            status=status.HTTP_404_NOT_FOUND
        )
    data = {
        'statut': colis.get_statut_courant_display(),
        'date_depot': colis.date_depot,
        'destination': colis.destination,
    }
    return Response(data)