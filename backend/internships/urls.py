from rest_framework.routers import DefaultRouter
from .views import InternshipViewSet, ApplicationViewSet

router = DefaultRouter()
router.register(r'internships', InternshipViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = router.urls
