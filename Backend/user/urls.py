from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from user.views import UserViewSet, CustomObtainAuthToken

router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += url(r'^api-token-auth/', CustomObtainAuthToken.as_view()),
