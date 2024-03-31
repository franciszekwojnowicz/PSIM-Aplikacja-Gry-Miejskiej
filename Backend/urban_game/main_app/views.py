from django.shortcuts import render
from .serializers import *
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

#simple views connection test
def test(request):
    if request.method == 'GET':
        return HttpResponse(200)
    else:
        return HttpResponse(400)


    
@api_view(['GET'])
def viewAllRestaurants(request):
    try:
        restaurants=Restaurant.objects.all()
        serializer=RestaurantSerializer(restaurants,many=True)
        return JsonResponse(serializer.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewAllAchivements(request):
    try:
        achivements=Achivement.objects.all()
        serializer=AchivementSerializer(achivements,many=True)
        print(serializer.data)
        return JsonResponse(serializer.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewAllUsers(request):
    try:
        users=User.objects.all()
        serializer=UserSerializer(users,many=True)
        return JsonResponse(serializer.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))

@api_view(['GET'])
def viewUserAchivements(request):
    try:
        id = request.GET.get('user')
        unlocked_achvement_database=Unlocked_Achivement.objects.filter(user=id)
        unlocked_achvements_serializer=Unlocked_AchivementSerializer(unlocked_achvement_database,many=True)
        unlocked_achivements=unlocked_achvements_serializer.data
        achivement_id=[]
        for unlocked_achivement in unlocked_achivements:
            achivement_id.append(unlocked_achivement["achivement"])
        achivements=Achivement.objects.filter(id__in=achivement_id)
        achivement_serializer=AchivementSerializer(achivements,many=True)
        return JsonResponse(achivement_serializer.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))
    
@api_view(['GET'])
def viewUserVisited_Restaurants(request):
    try:
        id = request.GET.get('user')
        visited_restaurant_database=Visited_Restaurant.objects.filter(user=id)
        visited_restaurant_serializer=Visited_RestaurantSerializer(visited_restaurant_database,many=True)
        visited_restaurants=visited_restaurant_serializer.data
        restaurant_id=[]
        for visited_restaurant in visited_restaurants:
            restaurant_id.append(visited_restaurant["restaurant"])
        restaurants=Restaurant.objects.filter(id__in=restaurant_id)
        restaurant_serializer=RestaurantSerializer(restaurants,many=True)
        return JsonResponse(restaurant_serializer.data,safe=False)
    except Exception as e:
        return Response(status=400, data=repr(e))  

@api_view(['GET'])  
def addVisited_Restaurant(request):
    try:
        code = request.GET.get('code')
        user = request.GET.get('user')
        restaurant=Restaurant.objects.get(unlock_code=code).id
        visited_restaurant=Visited_Restaurant(user=user,restaurant=restaurant)
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
            new_comment=Comment(restaurant=restaurant,user=user,text=text,to_comment=comment)
        else:
            new_comment=Comment(restaurant=restaurant,user=user,text=text,to_comment=None)
        new_comment.full_clean()
        new_comment.save()
        serializer=CommentSerializer(new_comment)
        return Response(serializer.data,status=201)
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
        serializer=UserSerializer(user)
        return Response(serializer.data,status=201)
    except Exception as e:
        return Response(status=400, data=repr(e))



