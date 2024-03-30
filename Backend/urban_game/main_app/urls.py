from django.urls import path, include
from . import views

urlpatterns = [
    path('test', views.test),
    path('viewAllRestaurants', views.viewAllRestaurants),
    path('viewAllAchivements', views.viewAllAchivements),
    path('viewAllUsers', views.viewAllUsers),
    path('viewUserAchivements', views.viewUserAchivements),
    path('viewUserVisited_Restaurants', views.viewUserVisited_Restaurants),
]