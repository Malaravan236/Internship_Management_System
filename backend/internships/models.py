from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class Internship(models.Model):
    company = models.ForeignKey(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    stipend = models.IntegerField()
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Application(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    internship = models.ForeignKey(Internship,
                                   on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')
    status = models.CharField(max_length=20, default='Pending')
