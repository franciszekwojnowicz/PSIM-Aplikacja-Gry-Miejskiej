from django.shortcuts import render
from .serializers import *
from django.http import HttpResponse, JsonResponse
# Create your views here.

#simple views connection test
def test(request):
    if request.method == 'GET':
        return HttpResponse(200)
    else:
        return HttpResponse(400)
        
