from django.shortcuts import render, get_object_or_404
from .serializers import *
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import  User
from django.db import IntegrityError
User = get_user_model() 
# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializerRegister(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(name=request.data['name'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "userID":  user.id})
    else:
        return Response(serializer.errors, 404)

@api_view(['POST'])  
@permission_classes([AllowAny])
def login_user(request):
    name = request.data.get('name')
    password = request.data.get('password')
    #user = get_object_or_404(User, name=request.data['name'])

    user = authenticate(name=name, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "userID": user.id})
    return Response(status=400, data="Invalid credentials")
    
@api_view(['GET']) ## UNUSED replaced by viewUserVisited_Restaurants()
def viewAllRestaurants(request):
    try:
        restaurants_database=Restaurant.objects.all()
        restaurant_serialized=RestaurantSerializer(restaurants_database,many=True)
        return Response(restaurant_serialized.data,status=200)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])  ## UNUSED replaced by viewUserAchivements()
def viewAllAchivements(request):
    try:
        achivements_database=Achivement.objects.all()
        achivements_serialized=AchivementSerializer(achivements_database,many=True)
        return Response(achivements_serialized.data,status=200)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewAllUsers(request):
    """View that for GET - return user ranking by points""" 
    try:
        users_database=User.objects.all().order_by('-points')
        users_serializerd=UserSerializerStats(users_database,many=True)
        return Response(users_serializerd.data,status=200)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET','PATCH'])  
def viewUser(request,user_id):
    """View that:
    
    for GET - returns user data
    
    for PATCH - edit user data - doesnt work"""
    try:
        authorization_header = request.headers.get('Authorization')
        authorization_token = authorization_header.split(' ')[1]
        user_database=User.objects.get(id=user_id)
        user_token=Token.objects.get(user=user_database).key
    except Exception as e:
        return Response(status=400, data=repr(e))

    if authorization_token == user_token:

        if request.method == "GET":
            try:
                user_database=User.objects.get(id=user_id)
                user_serialized=UserSerializerAccount(user_database)
                return Response(user_serialized.data,status=200)
            except Exception as e:
                return Response(status=400, data=repr(e))
        if request.method == "PATCH":
            try:
                # EDIT USER FIELDS - not implemented
                request.data.get("name")
                request.data.get("email")
                request.data.get("password")

                return Response(status=200,data="not implemented")
            except Exception as e:
                return Response(status=400,data=repr(e))
    else: 
        return Response(status=401, data="Unauthorized Access")

@api_view(['GET'])
def viewUserAchivements(request, user_id=None):
    """View that:
    
    for GET - returns unlocked and locked achivements for user"""
    try:
        id = user_id
        unlocked_achvement_database=Unlocked_Achivement.objects.filter(user=id)
        unlocked_achvements_serialized=Unlocked_AchivementSerializer(unlocked_achvement_database,many=True)
        unlocked_achivements=unlocked_achvements_serialized.data
        achivement_id=[]
        # tworzymy listę id odblokowanych achivementów
        for unlocked_achivement in unlocked_achivements:
            achivement_id.append(unlocked_achivement["achivement"])
        # filtrujemy po id z listy
        achivements_unlocked=Achivement.objects.filter(id__in=achivement_id)
        achivements_locked=Achivement.objects.all().exclude(id__in=achivement_id)
        achivements_unlocked_serialized=AchivementSerializer(achivements_unlocked,many=True)
        achivements_locked_serialized=AchivementSerializer(achivements_locked,many=True)
        achivements_serialized={}
        achivements_serialized["unlocked"]=achivements_unlocked_serialized.data
        achivements_serialized["locked"]=achivements_locked_serialized.data
        return Response(achivements_serialized,status=200)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET','POST'])
def viewUserRestaurants(request, user_id=None):
    """View that:
    
    for GET - returns visited and unvisited restaurants for user
     
    for POST - add a restaurant to visited restaurants"""
    # show visited restaurants for user
    if request.method == "GET":
        try:
            user = User.objects.get(id = user_id)
            visited_restaurant_database=Visited_Restaurant.objects.filter(user=user)
            visited_restaurant_serialized=Visited_RestaurantSerializer(visited_restaurant_database,many=True)
            visited_restaurants=visited_restaurant_serialized.data
            restaurant_id=[]
            # tworzymy listę id odwiedzonych resauracji
            for visited_restaurant in visited_restaurants:
                restaurant_id.append(visited_restaurant["restaurant"])
            # filtrujemy po id z listy
            restaurants_unlocked=Restaurant.objects.filter(id__in=restaurant_id)
            restaurants_locked=Restaurant.objects.all().exclude(id__in=restaurant_id)
            restaurants_unlocked_serialized=RestaurantSerializer(restaurants_unlocked,many=True)
            restaurants_locked_serialized=RestaurantSerializer(restaurants_locked,many=True)
            restaurant_serialized={}
            restaurant_serialized["unlocked"]=restaurants_unlocked_serialized.data
            restaurant_serialized["locked"]=restaurants_locked_serialized.data
            return Response(restaurant_serialized,status=200)
        except User.DoesNotExist as e:
            return Response(status=404, data=repr(e))
        except Exception as e:
            return Response(status=400, data=repr(e))
    # add restaurant to visited restaurants
    elif request.method == "POST":
        try:
            code = request.data.get('code')
            user = user_id
            restaurant_database=Restaurant.objects.get(unlock_code=code)
            user_database=User.objects.get(id=user)
            visited_restaurant=Visited_Restaurant(user=user_database,restaurant=restaurant_database)
            visited_restaurant.full_clean()
            visited_restaurant.save()
            respone_data = Visited_Restaurants_TypeSerializer(visited_restaurant)
            #tutaj można wstawić jakieś warunki do achivementów, np sprawdza ile restauracji danego typu odwiedzono i dodaje inlocked_achivement do usera
            visited_restaurant_database = Visited_Restaurant.objects.filter(user=user)
            visited_types_serialized = Visited_Restaurants_TypeSerializer(visited_restaurant_database,many=True)
            visited_types = visited_types_serialized.data
            sushi_count = 0
            pizza_count = 0
            kebab_count = 0
            for visited_type in visited_types:
                if visited_type["type"]=="sushi":
                    sushi_count+=1
                if visited_type["type"]=="pizza":
                    pizza_count+=1
                if visited_type["type"]=="kebab":
                    kebab_count+=1

            # when condition is fulified add a achivement for user
            user_database=User.objects.get(id=user)
            user_database.points += 1
            if sushi_count>1:
                achivement_database=Achivement.objects.get(name="sushi beginer")
                new_achivement=Unlocked_Achivement(user=user_database,achivement=achivement_database)
                if Unlocked_Achivement.objects.filter(user=user_database,achivement=achivement_database).exists() == False:
                    new_achivement.save()
                    user_database.points += 10
            if sushi_count>5:
                achivement_database=Achivement.objects.get(name="sushi master")
                new_achivement=Unlocked_Achivement(user=user_database,achivement=achivement_database)
                if Unlocked_Achivement.objects.filter(user=user_database,achivement=achivement_database).exists() == False:
                    new_achivement.save()
                    user_database.points += 30

            if pizza_count>1:
                achivement_database=Achivement.objects.get(name="pizza beginer")
                new_achivement=Unlocked_Achivement(user=user_database,achivement=achivement_database)
                if Unlocked_Achivement.objects.filter(user=user_database,achivement=achivement_database).exists() == False:
                    new_achivement.save()
                    user_database.points += 10
            if pizza_count>5:
                achivement_database=Achivement.objects.get(name="pizza master")
                new_achivement=Unlocked_Achivement(user=user_database,achivement=achivement_database)
                if Unlocked_Achivement.objects.filter(user=user_database,achivement=achivement_database).exists() == False:
                    new_achivement.save()
                    user_database.points += 30

            if kebab_count>1:
                achivement_database=Achivement.objects.get(name="kebab beginer")
                new_achivement=Unlocked_Achivement(user=user_database,achivement=achivement_database)
                if Unlocked_Achivement.objects.filter(user=user_database,achivement=achivement_database).exists() == False:
                    new_achivement.save()
                    user_database.points += 10
            if kebab_count>5:
                achivement_database=Achivement.objects.get(name="kebab master")
                new_achivement=Unlocked_Achivement(user=user_database,achivement=achivement_database)
                if Unlocked_Achivement.objects.filter(user=user_database,achivement=achivement_database).exists() == False:
                    new_achivement.save()
                    user_database.points += 30
            user_database.save()
            return Response(respone_data.data,status=200)
        except Exception as e:
            return Response(status=400, data=repr(e))
        

@api_view(['GET','POST'])
def viewRestaurant(request,restaurant_id):
    """View that:
    
    for GET - returns restauant info + resturant comments
     
    for POST - add a comment """
    # restaurant main site
    if request.method == "GET":
        try:
            # restaurant info   
            restaurant_database=Restaurant.objects.get(id=restaurant_id)
            restaurant_serialized=RestaurantSerializer(restaurant_database)
            restaurant=restaurant_serialized.data
            # comments for restaurant
            base_comments_database = Comment.objects.filter(restaurant=restaurant_id,to_comment__isnull=True)
            base_comments_serialized=CommentUserNameSerializer(base_comments_database,many=True)
            base_comments=base_comments_serialized.data
            # dla każdego komentarza nie będącego podkomentarzem doklejamy jego podkomentarze
            for base_comment in base_comments:
                subcomments_database = Comment.objects.filter(restaurant=restaurant_id,to_comment=base_comment["id"]).order_by('date')
                subcomments_serialized = CommentUserNameSerializer(subcomments_database,many=True)
                base_comment["subcomments"]=subcomments_serialized.data
            # combine info and comments
            restaurant_and_comments={}
            restaurant_and_comments["info"]=restaurant
            restaurant_and_comments["comments"]=base_comments
            return Response(restaurant_and_comments,status=200)
        except Exception as e:
            return Response(status=400, data=repr(e))
   # add comment    
    elif request.method == "POST":
        try:
            restaurant = Restaurant.objects.get(id=request.data.get('restaurant'))
            user = User.objects.get(id=request.data.get('user'))
            text = request.data.get('text')
            if request.data.get('comment') is not None:
                comment = Comment.objects.get(id=request.data.get('comment'))
                new_comment=Comment(restaurant=restaurant,user=user,text=text,to_comment=comment,date=timezone.now())
            else:
                new_comment=Comment(restaurant=restaurant,user=user,text=text,to_comment=None,date=timezone.now())
            new_comment.full_clean()
            new_comment.save()
            comment_serialized=CommentSerializer(new_comment)
            return Response(comment_serialized.data,status=201)
        except Exception as e:
            return Response(status=400, data=repr(e))


   
@api_view(['GET'])    
@permission_classes([AllowAny])
def addDefaultAchivements(request):
    """View that add basic achivements into database"""
    try:
        new_achivement = Achivement(name="sushi beginer", requirements="odwiedź co najmniej 2 restauracje sushi", points=10)
        new_achivement.save()

        new_achivement = Achivement(name="sushi master", requirements="odwiedź co najmniej 5 restauracji sushi", points=30)
        new_achivement.save()

        new_achivement = Achivement(name="pizza beginer", requirements="odwiedź co najmniej 2 pizzerie", points=10)
        new_achivement.save()

        new_achivement = Achivement(name="pizza master", requirements="odwiedź co najmniej 5 pizzerii", points=30)
        new_achivement.save()

        new_achivement = Achivement(name="kebab beginer", requirements="odwiedź co najmniej 2 kebaby", points=10)
        new_achivement.save()

        new_achivement = Achivement(name="kebab master", requirements="odwiedź co najmniej 5 kebabów", points=30)
        new_achivement.save()

        achivement_database=Achivement.objects.all()
        achivement_serialized=AchivementSerializer(achivement_database,many=True)
        return Response(achivement_serialized.data,status=201)
    except Exception as e:
        return Response(status=400, data=repr(e))