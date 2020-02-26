from random import randint

from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from quiz.models import Painting, Author, Style
from quiz.serializers import PaintingSerializer, AuthorSerializer, StyleSerializer


class PaintingViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows paintings to be viewed or edited.

    """
    queryset = Painting.objects.all()
    serializer_paint = PaintingSerializer
    serializer_author = AuthorSerializer
    serializer_style = StyleSerializer

    @action(detail=False, methods=['get'])
    def random(self, request):
        count = Painting.objects.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        random_painting = self.queryset[random_index]

        if random_painting is not None:
            serializer = self.serializer_paint(random_painting, fields=('id', 'image'))
            return Response(serializer.data)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def author(self, request, pk=None):
        painting = Painting.objects.get(id=pk)

        if painting is not None:
            result = {'id': self.serializer_paint(painting).data['id'],
                      'author': self.serializer_author(
                          Author.objects.get(id=self.serializer_paint(painting).data['author'])).data}
            return Response(result)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def name(self, request, pk=None):
        painting = Painting.objects.get(id=pk)

        if painting is not None:
            result = {'id': self.serializer_paint(painting).data['id'],
                      'name': self.serializer_paint(painting).data['name']}
            return Response(result)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def style(self, request, pk=None):
        painting = Painting.objects.get(id=pk)

        if painting is not None:
            result = {'id': self.serializer_paint(painting).data['id'],
                      'style': self.serializer_style(
                          Style.objects.get(id=self.serializer_paint(painting).data['style'])).data}
            return Response(result)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def variants_author(self, request, pk=None):
        count = Author.objects.aggregate(count=Count('id'))['count']
        used_id = [self.serializer_paint(Painting.objects.get(id=pk)).data['author']]
        i = 0
        variants = {'variants_author': []}

        while i != 3:
            random_index = randint(0, count - 1)
            random_id = self.serializer_author(Author.objects.all()[random_index]).data['id']

            if random_id not in used_id:
                variants.get('variants_author').append(self.serializer_author(
                    Author.objects.all()[random_index]).data)
                used_id.append(random_id)
                i += 1

        if variants is not None:
            return Response(variants)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def variants_name(self, request, pk=None):
        count = Painting.objects.aggregate(count=Count('id'))['count']
        used_id = [self.serializer_paint(Painting.objects.get(id=pk)).data['name']]
        i = 0
        variants = {'variants_name': []}

        while i != 3:
            random_index = randint(0, count - 1)
            random_id = self.serializer_paint(Painting.objects.all()[random_index]).data['id']

            if random_id not in used_id:
                variants.get('variants_name').append(self.serializer_paint(
                    Painting.objects.all()[random_index]).data['name'])
                used_id.append(random_id)
                i += 1

        if variants is not None:
            return Response(variants)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def variants_style(self, request, pk=None):
        count = Style.objects.aggregate(count=Count('id'))['count']
        used_id = [self.serializer_paint(Painting.objects.get(id=pk)).data['style']]
        i = 0
        variants = {'variants_style': []}

        while i != 3:
            random_index = randint(0, count - 1)
            random_id = self.serializer_style(Style.objects.all()[random_index]).data['id']

            if random_id not in used_id:
                variants.get('variants_style').append(self.serializer_style(
                    Style.objects.all()[random_index]).data)
                used_id.append(random_id)
                i += 1

        if variants is not None:
            return Response(variants)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)
