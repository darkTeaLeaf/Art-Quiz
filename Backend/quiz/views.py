from random import randint

from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from quiz.models import Painting
from quiz.serializers import PaintingSerializer


class PaintingViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows paintings to be viewed or edited.

    """
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

    @action(detail=True, methods=['get'])
    def get_random_painting(self, request, pk=None):
        count = Painting.objects.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        random_painting = Painting.objects.all()[random_index]

        if random_painting is not None:
            serializer = self.serializer_class(random_painting, context={"request": request})
            return Response(serializer.data)

