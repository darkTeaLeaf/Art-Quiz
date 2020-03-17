from django.contrib.auth.models import User
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from user.models import Progress
from user.permissions import UserPermission
from user.serializers import StatisticSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        retrieve:
        Return the user specified by id.

        list:
        Return a list of all the existing users.

        create:
        Create a new user.

        update:
        Update of all user fields. Request should contain all user parameters.

        partial_update:
        Update of all or some of user fields. There is no requirement to contain all the parameters.

        delete:
        Delete the user specified by id.

    """
    queryset = User.objects.all()
    serializer_user = UserSerializer
    serializer_stat = StatisticSerializer
    permission_classes = (UserPermission,)

    def get_serializer_class(self):
        return self.serializer_user

    @action(detail=True, methods=['patch'], url_path='statistic/victory')
    def win(self, request, pk=None):
        """
            patch:
            Automatic update of user statistic and achievements in case of right answer.

        """
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
        """
            patch:
            Automatic update of user statistic and achievements in case of wrong answer.

        """
        user = User.objects.get(id=pk)

        if user is not None:
            user.statistic.games_total += 1
            user.save()
            return Response()
        else:
            return Response(self.serializer_user.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'id': token.user_id, 'token': token.key})
