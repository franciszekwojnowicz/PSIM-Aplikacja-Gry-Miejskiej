from django.db import models
from django.core.validators import MinLengthValidator
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=30,uniqe=True,validators=[MinLengthValidator(5)])
    email = models.CharField(max_length=30,uniqe=True,validators=[MinLengthValidator(5)])
    password = models.CharField(max_length=255,validators=[MinLengthValidator(8)])
    points = models.IntegerField()
    class Meta:
        db_table = 'User'

class Restaurant(models.Model):
    name = models.CharField(max_length=60,uniqe=True,validators=[MinLengthValidator(5)])
    type = models.CharField(max_length=30,uniqe=True,validators=[MinLengthValidator(5)])
    position = models.IntegerField()
    unlock_code = models.IntegerField()
    class Meta:
        db_table = 'Restaurant'

class Achivement(models.Model):
    name = models.CharField(max_length=60,uniqe=True,validators=[MinLengthValidator(5)])
    requirements = models.CharField(max_length=60,uniqe=True,validators=[MinLengthValidator(5)])
    points = models.IntegerField()
    class Meta:
        db_table = 'Achivement'

class Rating(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    restaurant = models.ForeignKey('Restaurant',on_delete=models.CASCADE)
    rating_value = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    class Meta:
        db_table = 'Rating'

class Comment(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    restaurant = models.ForeignKey('Restaurant',on_delete=models.CASCADE)
    text = models.TextField()
    comment = models.ForeignKey('Comment',on_delete=models.CASCADE)
    class Meta:
        db_table = 'Comment'

class Visited_Restaurant(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    restaurant = models.ForeignKey('Restaurant',on_delete=models.CASCADE)
    class Meta:
        db_table = 'Visited_Restaurant'

class Unlocked_Achivement(models.Model):
    achivement = models.ForeignKey('Achivement',on_delete=models.CASCADE)
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    class Meta:
        db_table = 'Unlocked_Achivement'      