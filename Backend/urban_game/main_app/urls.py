from django.urls import path, include
from . import views

urlpatterns = [
    path('test', views.test),
    #path('viewAllAchivements', views.viewAllAchivements),
    #path('viewUserAchivements', views.viewUserAchivements),
    path('achivements', views.viewUserAchivements),

    #path('viewAllRestaurants', views.viewAllRestaurants),
    #path('viewUserVisited_Restaurants', views.viewUserVisited_Restaurants),
    #path('addVisited_Restaurant', views.addVisited_Restaurant),
    path('restaurants', views.restaurants),

    

    path('users', views.viewAllUsers),
    
    
    
    path('addComment', views.addComment),
    path('viewCommentsForRestaurant',views.viewCommentsForRestaurant),
    path('register/', views.register_user), 
    path('login/', views.login_user),

    path('addDefaultAchivements', views.addDefaultAchivements), 
]