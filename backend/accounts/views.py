# from django.shortcuts import render

# # Create your views here.
# from rest_framework import generics
# from .serializers import RegisterSerializer
# from .models import User

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]
        password = data["password"]

        user = authenticate(username=email, password=password)
        if user:
            return JsonResponse({"email": email})
        return JsonResponse({"message": "Invalid credentials"}, status=401)
