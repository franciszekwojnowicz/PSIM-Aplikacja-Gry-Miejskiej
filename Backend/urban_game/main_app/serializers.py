from .models import *
from rest_framework import serializers

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'type', 'position', 'unlock_code']

class AchivementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achivement
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achivement
        fields = ['name', 'points']

class Unlocked_AchivementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unlocked_Achivement
        fields = '__all__'

class Visited_RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visited_Restaurant
        fields = '__all__'

