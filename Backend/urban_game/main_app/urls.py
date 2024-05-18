from django.urls import path, include
from . import views

urlpatterns = [
    #path('viewAllAchivements', views.viewAllAchivements),
    #path('viewUserAchivements', views.viewUserAchivements),
    path('user/<int:user_id>/achivements/', views.viewUserAchivements),

 
    #path('viewUserVisited_Restaurants', views.viewUserVisited_Restaurants),
    #path('addVisited_Restaurant', views.addVisited_Restaurant),
    path('user/<int:user_id>/restaurants/', views.viewUserRestaurants),

    
    path('user/', views.viewAllUsers),
    
    
    #path('viewAllRestaurants', views.viewAllRestaurants),
    #path('addComment', views.addComment),
    #path('viewCommentsForRestaurant',views.viewCommentsForRestaurant),

    path('restaurant/<int:restaurant_id>/',views.viewRestaurant),


    path('register/', views.register_user), 
    path('login/', views.login_user),

    path('addDefaultAchivements', views.addDefaultAchivements), 
]