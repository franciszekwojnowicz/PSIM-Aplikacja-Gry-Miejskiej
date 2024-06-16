from django.urls import path, include, re_path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    #re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
    path('api/user/', views.viewAllUsers),   
    path('api/user/<int:user_id>/', views.viewUser),
    path('api/user/<int:user_id>/restaurants/', views.viewUserRestaurants),
    path('api/user/<int:user_id>/achievements/', views.viewUserAchivements),
    
    path('api/restaurant/<int:restaurant_id>/',views.viewRestaurant),
    path('api/restaurant/<int:restaurant_id>/comment/',views.addComment),
    path('api/restaurant/<int:restaurant_id>/rating/',views.addRating),

    path('api/register/', views.register_user), 
    path('api/login/', views.login_user),

    path('api/addDefaultAchievements', views.addDefaultAchivements),
    
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]