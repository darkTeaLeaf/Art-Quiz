from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from .views import PaintingViewSet, AuthorViewSet, StyleViewSet

router = DefaultRouter()
router.register(r'paintings', PaintingViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'styles', StyleViewSet)
urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
