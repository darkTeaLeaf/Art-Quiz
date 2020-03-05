from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response

from user.models import Statistic
from user.serializers import UserSerializer, StatisticSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows users to be viewed or edited.

    """
    queryset = User.objects.all()
    serializer_paint = UserSerializer
    serializer_stat = StatisticSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['get'])
    def statistic(self, request, pk=None):
        user = User.objects.get(id=pk)

        if user is not None:
            serializer = self.serializer_stat(user.statistic)
            return Response(serializer.data)
        else:
            return Response(self.serializer_stat.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def post_statistic(self, request, pk=None):
        user = User.objects.get(id=pk)

        if user is not None:
            # TODO
            return Response()
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)
