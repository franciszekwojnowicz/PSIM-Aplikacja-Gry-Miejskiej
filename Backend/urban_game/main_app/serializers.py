from .models import *
from rest_framework import serializers

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'type', 'position', 'code']