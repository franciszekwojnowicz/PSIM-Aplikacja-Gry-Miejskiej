from django.urls import path, include
from . import views

urlpatterns = [
    path('api/user/', views.viewAllUsers),   
    path('api/user/<int:user_id>/', views.viewUser),
    path('api/user/<int:user_id>/restaurants/', views.viewUserRestaurants),
    path('api/user/<int:user_id>/achievements/', views.viewUserAchivements),
    
    path('api/restaurant/<int:restaurant_id>/',views.viewRestaurant),
    path('api/restaurant/<int:restaurant_id>/comment/',views.addComment),

    path('api/register/', views.register_user), 
    path('api/login/', views.login_user),

    path('api/addDefaultAchievements', views.addDefaultAchivements),
]