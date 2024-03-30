from django.shortcuts import render
from .serializers import *
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
# Create your views here.

#simple views connection test
def test(request):
    if request.method == 'GET':
        return HttpResponse(200)
    else:
        return HttpResponse(400)

def viewAllRestaurants(request):
    if request.method == 'GET':
        restaurants=Restaurant.objects.all()
        serializer=RestaurantSerializer(restaurants,many=True)
        JsonResponse(serializer.data,safe=False)
    else:
        HttpResponse(status=400)

def viewAllAchivements(request):
    if request.method == 'GET':
        achivements=Achivement.objects.all()
        serializer=AchivementSerializer(achivements,many=True)
        JsonResponse(serializer.data,safe=False)
    else:
        HttpResponse(status=400)

def viewAllUsers(request):
    if request.method == 'GET':
        users=User.objects.all()
        serializer=UserSerializer(users,many=True)
        JsonResponse(serializer.data,safe=False)
    else:
        HttpResponse(status=400)

#untested
def viewUserAchivements(request):
    if request.method == 'GET':
        id = request.GET.get('user')
        unlocked_achvements=Unlocked_Achivement.objects.filter(user=id)
        serializer=Unlocked_AchivementSerializer(unlocked_achvements,many=True)
        u_achivements=serializer.data
        achivement_data=[]
        for u_achivement in u_achivements:
            ach=Achivement.objects.filter(id=u_achivement["id"])
            achivement_data.append(ach.data)
        JsonResponse(serializer.data,safe=False)
    else:
        HttpResponse(status=400)
    
        
