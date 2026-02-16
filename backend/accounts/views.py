from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json

# ===== DRF imports for profile =====
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# ======================
# LOGIN FUNCTION
# ======================
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)

        if user:
            return JsonResponse({
                "email": user.email,
                "username": user.username
            })

        return JsonResponse({"message": "Invalid credentials"}, status=401)


# ======================
# PROFILE API (NEW)
# ======================
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })

    def patch(self, request):
        user = request.user
        user.username = request.data.get("username", user.username)
        user.save()

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })
