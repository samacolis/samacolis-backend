from rest_framework import routers
from django.urls import include, path
from .views import ClientViewSet, ColisViewSet, track_colis

router = routers.DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'colis',    ColisViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Endpoint public de suivi
    path('track/<uuid:id>/', track_colis, name='track-colis'),
]
