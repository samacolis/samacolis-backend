from rest_framework import routers
from django.urls import include, path
from .views import ClientViewSet, ColisViewSet, track_colis, RegisterView, MyTokenObtainPairView, HistoriqueSuiviViewSet, MeView, VerifyEmailView

router = routers.DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'colis',    ColisViewSet)
router.register(r'historique-suivi', HistoriqueSuiviViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'), # Décommenté
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Utilisation de la vue personnalisée
    path('me/', MeView.as_view(), name='me'), # Endpoint pour les infos utilisateur
    path('verify-email/<uuid:token>/', VerifyEmailView.as_view(), name='verify-email'), # Nouvelle URL
    path('track/<uuid:id>/', track_colis, name='track-colis'),
]
