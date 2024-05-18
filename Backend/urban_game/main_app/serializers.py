from .models import *
from rest_framework import serializers

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'type', 'position', 'description']


class AchivementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achivement
        fields = '__all__'


class UserSerializerRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password']


class UserSerializerAccount(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'is_superuser', 'points']

class UserSerializerStats(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'points']

class Unlocked_AchivementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unlocked_Achivement
        fields = '__all__'

class Visited_RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visited_Restaurant
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentUserNameSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField("get_user")
    class Meta:
        model = Comment
        fields = ['id','text','date','name', 'restaurant', 'to_comment'] 
    def get_user(self,obj):
        return obj.user.name
    
class Visited_Restaurants_TypeSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField("get_type")
    class Meta:
        model = Visited_Restaurant
        fields = ['id', 'restaurant', 'type'] 
    def get_type(self,obj):
        return obj.restaurant.type
    