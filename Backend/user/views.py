from rest_framework import viewsets

from user.models import Profile
from user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows users to be viewed or edited.

    """
    queryset = Profile.objects.all()
    serializer_paint = UserSerializer
