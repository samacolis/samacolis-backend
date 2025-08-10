from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings # Importez settings

schema_view = get_schema_view(
   openapi.Info(
      title="SamaColis API",
      default_version='v1',
      description="Documentation de l'API SamaColis",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@samacolis.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API REST (clients, colis)
    path('api/<str:version>/', include('api.urls')),

    # JWT : obtention et rafraîchissement de token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Pages du site (accueil, fonctionnement, contact, etc.)
    
]

if settings.DEBUG: # N'afficher la doc qu'en mode DEBUG
    urlpatterns += [
        path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]

