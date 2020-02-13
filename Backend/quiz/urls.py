from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter

from .views import PaintingViewSet

router = DefaultRouter()
router.register(r'paintings', PaintingViewSet)
urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)