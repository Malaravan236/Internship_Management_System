from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Internship, Application
from .serializers import InternshipSerializer, ApplicationSerializer

class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer
    permission_classes = [permissions.IsAuthenticated]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
