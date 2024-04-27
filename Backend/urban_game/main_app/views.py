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

User = get_user_model() 
# Create your views here.

#simple views connection test
def test(request):
    if request.method == 'GET':
        return HttpResponse(200)
    else:
        return HttpResponse(400)

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
        return Response({"token": token.key, "user": serializer.data})
    else:
        return Response(serializer.errors)

@api_view(['POST'])  
@permission_classes([AllowAny])
def login_user(request):
    name = request.data.get('name')
    password = request.data.get('password')
    #user = get_object_or_404(User, name=request.data['name'])

    user = authenticate(name=name, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    return Response(status=400, data="Invalid credentials")
    
@api_view(['GET'])
def viewAllRestaurants(request):
    try:
        restaurants_database=Restaurant.objects.all()
        restaurant_serialized=RestaurantSerializer(restaurants_database,many=True)
        return JsonResponse(restaurant_serialized.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewAllAchivements(request):
    try:
        achivements_database=Achivement.objects.all()
        svhivements_serialized=AchivementSerializer(achivements_database,many=True)
        return JsonResponse(svhivements_serialized.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
@permission_classes([AllowAny]) # do testow
def viewAllUsers(request): 
    try:
        users_database=User.objects.all()
        users_serializerd=UserSerializerAll(users_database,many=True)
        return JsonResponse(users_serializerd.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewUserAchivements(request):
    try:
        id = request.GET.get('user')
        unlocked_achvement_database=Unlocked_Achivement.objects.filter(user=id)
        unlocked_achvements_serialized=Unlocked_AchivementSerializer(unlocked_achvement_database,many=True)
        unlocked_achivements=unlocked_achvements_serialized.data
        achivement_id=[]
        # tworzymy listę id odblokowanych achivementów
        for unlocked_achivement in unlocked_achivements:
            achivement_id.append(unlocked_achivement["achivement"])
        # filtrujemy po id z listy
        achivements=Achivement.objects.filter(id__in=achivement_id)
        achivement_serialized=AchivementSerializer(achivements,many=True)
        return JsonResponse(achivement_serialized.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))
    
@api_view(['GET'])
def viewUserVisited_Restaurants(request):
    try:
        id = request.GET.get('user')
        visited_restaurant_database=Visited_Restaurant.objects.filter(user=id)
        visited_restaurant_serialized=Visited_RestaurantSerializer(visited_restaurant_database,many=True)
        visited_restaurants=visited_restaurant_serialized.data
        restaurant_id=[]
        # tworzymy listę id odwiedzonych resauracji
        for visited_restaurant in visited_restaurants:
            restaurant_id.append(visited_restaurant["restaurant"])
        # filtrujemy po id z listy
        restaurants=Restaurant.objects.filter(id__in=restaurant_id)
        restaurant_serialized=RestaurantSerializer(restaurants,many=True)
        return JsonResponse(restaurant_serialized.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewCommentsForRestaurant(request):
    try:
        restaurant = request.GET.get('restaurant')
        base_comments_database = Comment.objects.filter(restaurant=restaurant,to_comment__isnull=True)
        base_comments_serialized=CommentUserNameSerializer(base_comments_database,many=True)
        base_comments=base_comments_serialized.data
        # dla każdego komentarza nie będącego podkomentarzem doklejamy jego podkomentarze
        for base_comment in base_comments:
            subcomments_database = Comment.objects.filter(restaurant=restaurant,to_comment=base_comment["id"]).order_by('date')
            subcomments_serialized = CommentUserNameSerializer(subcomments_database,many=True)
            base_comment["subcomments"]=subcomments_serialized.data
        return JsonResponse(base_comments,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))   

@api_view(['GET'])  
def addVisited_Restaurant(request):
    try:
        code = request.GET.get('code')
        user = request.GET.get('user')
        restaurant_database=Restaurant.objects.get(unlock_code=code)
        user_database=User.objects.get(id=user)
        visited_restaurant=Visited_Restaurant(user=user_database,restaurant=restaurant_database)
        visited_restaurant.full_clean()
        visited_restaurant.save()
        #tutaj można wstawić jakieś warunki do achivementów, np sprawdza ile restauracji danego typu odwiedzono i dodaje inlocked_achivement do usera
        return Response(status=200)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['POST'])
def addComment(request):
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

@api_view(['POST'])    
def addUser(request):
    try:
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        user = User(name=name,email=email,password=password,points=0)
        user.full_clean()
        user.save()
        user_serialized=UserSerializer(user)
        return Response(user_serialized.data,status=201)
    except Exception as e:
        return Response(status=400, data=repr(e))
