from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from user.views import UserViewSet, StatisticViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'user/statistic', StatisticViewSet)
urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
