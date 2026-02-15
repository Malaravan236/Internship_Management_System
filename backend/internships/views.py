from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from accounts.models import Internship, Application
from .serializers import InternshipSerializer, ApplicationSerializer

class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all().order_by("-created_at")
    serializer_class = InternshipSerializer
    permission_classes = [permissions.AllowAny]  # internships list view public

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by("-applied_at")
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]  # apply needs login

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)
