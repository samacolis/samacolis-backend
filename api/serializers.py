from rest_framework import serializers
from .models import Client, Colis

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ColisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colis
        fields = '__all__'

