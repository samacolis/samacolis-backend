from rest_framework.throttling import UserRateThrottle

class LoginRateThrottle(UserRateThrottle):
    scope = 'login_attempts'

    def allow_request(self, request, view):
        # Appliquer la limitation de débit uniquement aux requêtes POST (tentatives de connexion)
        if request.method == 'POST':
            return super().allow_request(request, view)
        return True
