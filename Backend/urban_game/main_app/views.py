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

#do wszystkich dodać dodatkowe warunki integralności danych
def viewAllRestaurants(request):
    if request.method == 'GET':
        restaurants=Restaurant.objects.all()
        serializer=RestaurantSerializer(restaurants,many=True)
        return JsonResponse(serializer.data,safe=False)
    else:
        return HttpResponse(status=400)

def viewAllAchivements(request):
    if request.method == 'GET':
        achivements=Achivement.objects.all()
        serializer=AchivementSerializer(achivements,many=True)
        print(serializer.data)
        return JsonResponse(serializer.data,safe=False)
    else:
        return HttpResponse(status=400)

def viewAllUsers(request):
    if request.method == 'GET':
        users=User.objects.all()
        serializer=UserSerializer(users,many=True)
        return JsonResponse(serializer.data,safe=False)
    else:
        return HttpResponse(status=400)

def viewUserAchivements(request):
    if request.method == 'GET':
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
    else:
        return HttpResponse(status=400)
    

def viewUserVisited_Restaurants(request):
    if request.method == 'GET':
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
    else:
        return HttpResponse(status=400)  
    
def addVisited_Restaurant(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        user = request.GET.get('user')
        restaurant=Restaurant.objects.get(unlock_code=code).id
        visited_restaurant=Visited_Restaurant(user=user,restaurant=restaurant)
        visited_restaurant.full_clean()
        visited_restaurant.save()
        #tutaj można wstawić jakieś warunki do achivementów, np sprawdza ile restauracji danego typu odwiedzono i dodaje inlocked_achivement do usera
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)
    
def addComment(request):
    if request.method == 'GET':
        restaurant = Restaurant.objects.get(id=request.GET.get('restaurant'))
        user = User.objects.get(id=request.GET.get('user'))
        text = request.GET.get('text')
        if request.GET.get('comment') is not None:
            comment = Comment.objects.get(id=request.GET.get('comment'))
            new_comment=Comment(restaurant=restaurant,user=user,text=text,to_comment=comment)
        else:
            new_comment=Comment(restaurant=restaurant,user=user,text=text,to_comment=None)
        new_comment.full_clean()
        new_comment.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)

