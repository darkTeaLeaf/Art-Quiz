from django.contrib.auth.models import User
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from user.models import Progress
from user.permissions import UserPermission
from user.serializers import StatisticSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows users to be viewed or edited.

    """
    queryset = User.objects.all()
    serializer_user = UserSerializer
    serializer_stat = StatisticSerializer
    permission_classes = (UserPermission,)

    def get_serializer_class(self):
        return self.serializer_user

    @action(detail=True, methods=['patch'], url_path='statistic/victory')
    def win(self, request, pk=None):
        user = User.objects.get(id=pk)

        if user is not None:
            # Update of achievements
            Progress.objects.filter(profile__user=pk, achievement__type=0).exclude(
                achievement__max_score=F('progress')).update(progress=F('progress') + 1)

            user.statistic.games_total += 1
            user.statistic.wins_total += 1
            user.save()
            return Response()
        else:
            return Response(self.serializer_user.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], url_path='statistic/fail')
    def lose(self, request, pk=None):
        user = User.objects.get(id=pk)

        if user is not None:
            user.statistic.games_total += 1
            user.save()
            return Response()
        else:
            return Response(self.serializer_user.errors, status=status.HTTP_400_BAD_REQUEST)
