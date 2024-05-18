from django.db import models
from django.core.validators import MinLengthValidator
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.



class CustomUserManager(BaseUserManager):
    def create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError('Please provide an email address')
        email = self.normalize_email(email)      
        user = self.model(name=name,email=email, **extra_fields)
        user.set_password(password)
        print(f"""
              Name: {user.name},
              email: {user.email},
              password: {user.password}
              """)
        user.save()
        return user
       
    def create_superuser(self, name, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        #if extra_fields.get('is_staff') is not True:
        #    raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(('Superuser must have is_superuser=True.'))

        user = self.create_user(name,email,password,**extra_fields)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30,unique=True,validators=[MinLengthValidator(5)])
    email = models.EmailField(verbose_name="email address",max_length=255,unique=True,)
    password = models.CharField(max_length=255,validators=[MinLengthValidator(8)])
    USERNAME_FIELD = "name"
    REQUIRED_FIELDS = ['email','password']
    points = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()
    #image = models.ImageField(upload_to ='uploads/',blank=True,null=True)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'User'

    

class Restaurant(models.Model):
    name = models.CharField(max_length=60,unique=True,validators=[MinLengthValidator(5)])
    type = models.CharField(max_length=30,validators=[MinLengthValidator(5)])
    position = models.IntegerField()
    unlock_code = models.IntegerField()
    description = models.TextField(default="This is a restaurant")
    class Meta:
        db_table = 'Restaurant'

class Achivement(models.Model):
    name = models.CharField(max_length=60,unique=True,validators=[MinLengthValidator(5)])
    requirements = models.CharField(max_length=60,unique=True,validators=[MinLengthValidator(5)])
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
    to_comment = models.ForeignKey("self", on_delete=models.CASCADE,null=True,blank=True)
    date = models.DateTimeField()
    class Meta:
        db_table = 'Comment'

class Visited_Restaurant(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    restaurant = models.ForeignKey('Restaurant',on_delete=models.CASCADE)
    class Meta:
        db_table = 'Visited_Restaurant'
        constraints = [models.UniqueConstraint(fields=['user','restaurant'],name='unique_user_restaurant'),]

class Unlocked_Achivement(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    achivement = models.ForeignKey('Achivement',on_delete=models.CASCADE)
    class Meta:
        db_table = 'Unlocked_Achivement'      
        constraints = [models.UniqueConstraint(fields=['user','achivement'],name='unique_user_achivement'),]
