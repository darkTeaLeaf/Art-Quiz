from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

from user.models import Profile, Statistic
from user.serializers import UserSerializer, StatisticSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows users to be viewed or edited.

    """
    queryset = User.objects.all()
    serializer_paint = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class StatisticViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows statistics to be viewed or edited.

    """
    queryset = Statistic.objects.all()
    serializer_paint = StatisticSerializer
    permission_classes = [IsAdminUser]
