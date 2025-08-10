from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        print(f"Attempting authentication with email: {username}")
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=username) # Authenticate using email
            print(f"User found: {user.email}, is_active: {user.is_active}")
        except UserModel.DoesNotExist:
            print(f"User with email {username} not found.")
            return None
        if user.check_password(password):
            print(f"Password check successful for {user.email}")
            return user
        print(f"Password check failed for {user.email}")
        return None

    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
