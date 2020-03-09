from random import randint

from django.db.models import Count
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from quiz.models import Painting, Author, Style
from quiz.serializers import PaintingSerializer, AuthorSerializer, StyleSerializer


class PaintingViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    """
        API endpoint that allows paintings to be viewed or edited.

    """
    queryset = Painting.objects.all()
    serializer_paint = PaintingSerializer
    serializer_author = AuthorSerializer
    serializer_style = StyleSerializer

    def get_serializer_class(self):
        return self.serializer_paint

    @action(detail=False, methods=['get'])
    def random(self, request):
        count = Painting.objects.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        random_painting = self.queryset[random_index]

        if random_painting is not None:
            serializer = self.serializer_paint(random_painting, context={'request': request})
            return Response(serializer.data)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def variants(self, request, pk=None):
        variants = []
        paint = self.serializer_paint(Painting.objects.get(id=pk), context={'request': request})
        type_ = self.request.query_params.get('type')

        if type_ == 'author':
            count = Author.objects.aggregate(count=Count('id'))['count']
            used_id = [paint.data['author']]
            i = 0

            while i != 3:
                random_index = randint(0, count - 1)
                random_id = self.serializer_author(Author.objects.all()[random_index]).data['id']

                if random_id not in used_id:
                    variants.append(self.serializer_author(
                        Author.objects.all()[random_index]).data['name'])
                    used_id.append(random_id)
                    i += 1

        if type_ == 'name':
            count = Painting.objects.aggregate(count=Count('id'))['count']
            used_id = [paint.data['name']]
            i = 0

            while i != 3:
                random_index = randint(0, count - 1)
                random_id = \
                    self.serializer_paint(Painting.objects.all()[random_index], context={'request': request}).data['id']

                if random_id not in used_id:
                    variants.append(self.serializer_paint(
                        Painting.objects.all()[random_index], context={'request': request}).data['name'])
                    used_id.append(random_id)
                    i += 1

        if type_ == 'style':
            count = Style.objects.aggregate(count=Count('id'))['count']
            used_id = [paint.data['style']]
            i = 0

            while i != 3:
                random_index = randint(0, count - 1)
                random_id = self.serializer_style(Style.objects.all()[random_index]).data['id']

                if random_id not in used_id:
                    variants.append(self.serializer_style(
                        Style.objects.all()[random_index]).data['name'])
                    used_id.append(random_id)
                    i += 1

        if variants is not None:
            return Response(variants)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)
