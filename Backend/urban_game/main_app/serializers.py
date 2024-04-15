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
        model = User
        fields = ['name', 'points']

class UserSerializerAll(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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
    