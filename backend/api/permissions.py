from rest_framework import permissions

class IsTransporteur(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser l'accès qu'aux utilisateurs du groupe 'Transporteurs'.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='Transporteurs').exists()

class IsClient(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser l'accès qu'aux utilisateurs ayant un profil Client.
    """
    def has_permission(self, request, view):
        return request.user and hasattr(request.user, 'client_profile') and request.user.client_profile
