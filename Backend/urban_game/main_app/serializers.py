from .models import *
from rest_framework import serializers

class RestaurantSerializer(serializers.ModelSerializer):
    address = serializers.SerializerMethodField()
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'type', 'address', 'description', 'image', 'map_link', 'rating_average']
    def get_address(self, obj):
        return '{} {} , {}'.format(obj.street, obj.street_number, obj.city)


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
        fields = ['name', 'email', 'is_superuser', 'points', 'image']

class UserSerializerAccountPatch(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'image']
        extra_kwargs = {'password': {'write_only': True}}

class UserSerializerStats(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'points', 'image']

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
    image = serializers.SerializerMethodField("get_image")
    class Meta:
        model = Comment
        fields = ['id','text','date','name','image', 'restaurant', 'to_comment'] 
    def get_user(self,obj):
        return obj.user.name
    def get_image(self,obj):
        return obj.user.image
    
class Visited_Restaurants_TypeSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField("get_type")
    nameRestaurant = serializers.SerializerMethodField("get_name")
    class Meta:
        model = Visited_Restaurant
        fields = ['id', 'restaurant', 'nameRestaurant', 'type'] 
    def get_type(self,obj):
        return obj.restaurant.type
    def get_name(self,obj):
        return obj.restaurant.name
    
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
    