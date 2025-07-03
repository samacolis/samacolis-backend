from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API REST (clients, colis)
    path('api/', include('api.urls')),

    # JWT : obtention et rafraîchissement de token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Pages du site (accueil, fonctionnement, contact, etc.)
    path('', include('pages.urls')),  # ⬅️ C'est cette ligne qui rend /fonctionnement/ accessible
]

