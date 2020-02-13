from random import randint

from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from quiz.models import Painting, Author
from quiz.serializers import PaintingSerializer, AuthorSerializer


class PaintingViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows paintings to be viewed or edited.

    """
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer
    serializer_second = AuthorSerializer

    @action(detail=False, methods=['get'])
    def random(self, request, pk=None):
        count = Painting.objects.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        random_painting = self.queryset[random_index]

        if random_painting is not None:
            serializer = self.serializer_class(random_painting, fields=('id', 'image'))
            return Response(serializer.data)
        else:
            return Response(self.serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def author(self, request, pk=None):
        painting = Painting.objects.get(id=pk)

        if painting is not None:
            result = {'id': self.serializer_class(painting).data['id'],
                      'author': self.serializer_second(
                          Author.objects.get(id=self.serializer_class(painting).data['author'])).data}
            return Response(result)
        else:
            return Response(self.serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def variants(self, request, pk=None):
        count = Author.objects.aggregate(count=Count('id'))['count']
        used_id = [self.serializer_class(Painting.objects.get(id=pk)).data['author']]
        i = 0
        variants = {'variants_author': []}

        while i != 3:
            random_index = randint(0, count - 1)
            random_id = self.serializer_second(Author.objects.all()[random_index]).data['id']

            if random_id not in used_id:
                variants.get('variants_author').append(self.serializer_second(
                    Author.objects.all()[random_index]).data)
                used_id.append(random_id)
                i += 1

        if variants is not None:
            return Response(variants)
        else:
            return Response(self.serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
