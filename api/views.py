from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Colis
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Client, Colis
from .serializers import ClientSerializer, ColisSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class ColisViewSet(viewsets.ModelViewSet):
    queryset = Colis.objects.all()
    serializer_class = ColisSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Admins voient tous les colis
        if user.is_staff:
            return Colis.objects.all()
        # Transporteurs ne voient que leurs colis assignés
        if user.groups.filter(name='Transporteurs').exists():
            return Colis.objects.filter(assigned_to=user)
        # Les autres utilisateurs n'ont pas accès
        return Colis.objects.none()

@api_view(['GET'])
@permission_classes([AllowAny])
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

