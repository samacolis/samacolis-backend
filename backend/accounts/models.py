from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import uuid
from datetime import timedelta
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_active = False # L'utilisateur n'est pas actif tant que l'email n'est pas vérifié
        user.email_verification_token = str(uuid.uuid4()) # Générer un jeton de vérification
        user.email_token_expires = timezone.now() + timedelta(hours=24) # Le jeton expire dans 24 heures
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    email_verification_token = models.UUIDField(default=uuid.uuid4, editable=False, null=True, blank=True) # Jeton de vérification
    email_token_expires = models.DateTimeField(null=True, blank=True) # Date d'expiration du jeton

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=('groups'),
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions ' 
            'granted to each of their groups.'
        ),
        related_name="custom_user_groups", # Ajout de related_name
        related_query_name="custom_user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=('user permissions'),
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_name="custom_user_permissions", # Ajout de related_name
        related_query_name="custom_user",
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager() # Associer le gestionnaire personnalisé

    class Meta:
        app_label = 'accounts'

    def __str__(self):
        return self.email
