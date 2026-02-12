from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import JsonResponse

def home(request):
    return JsonResponse({"status": "Backend running ✅"})

urlpatterns = [
    path("", home),

    path("admin/", admin.site.urls),

    path("api/", include("accounts.urls")),
    path("api/", include("internships.urls")),

    # ✅ JWT endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]


# http://127.0.0.1:8000/api/internships/

# http://127.0.0.1:8000/api/applications/