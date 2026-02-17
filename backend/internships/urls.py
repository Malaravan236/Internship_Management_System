from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    InternshipViewSet, ApplicationViewSet,
    FeedbackCreateAPIView, MyCertificateAPIView,
    VerifyCertificateAPIView, AdminUpdateApplicationStatusAPIView
)

router = DefaultRouter()
router.register(r"internships", InternshipViewSet, basename="internship")
router.register(r"applications", ApplicationViewSet, basename="application")

urlpatterns = [
    path("", include(router.urls)),
     path("feedback/", FeedbackCreateAPIView.as_view()),
    path("certificates/my/<int:application_id>/", MyCertificateAPIView.as_view()),
    path("certificates/verify/<str:token>/", VerifyCertificateAPIView.as_view()),
    path("applications/<int:application_id>/status/", AdminUpdateApplicationStatusAPIView.as_view()),
]
