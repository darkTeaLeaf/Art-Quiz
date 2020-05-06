from django.contrib.auth.models import User
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from user.models import Progress, Request
from user.permissions import UserPermission, IsOwnerOrAdmin
from user.serializers import StatisticSerializer, UserSerializer, RequestSerializer


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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.get(user_id=serializer.data['id'])

        return Response({'id': token.user_id, 'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)

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


class RequestViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwnerOrAdmin)

    def get_serializer_class(self):
        return RequestSerializer

    def get_queryset(self):
        if 'user_id' in self.kwargs:
            if User.objects.get(id=self.kwargs['user_id']) == self.request.user:
                return Request.objects.filter(user_id=self.request.user.id)
        else:
            if self.request.user.is_staff:
                return Request.objects.all()


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'id': token.user_id, 'token': token.key})
