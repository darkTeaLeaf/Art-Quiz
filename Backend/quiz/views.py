import random

from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from quiz.models import Painting, Author, Style
from quiz.serializers import PaintingSerializer, AuthorSerializer, StyleSerializer


class PaintingViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    """
        retrieve:
        Return the painting specified by id.

        list:
        Return a list of all the existing paintings.

    """
    queryset = Painting.objects.all()
    serializer_paint = PaintingSerializer
    serializer_author = AuthorSerializer
    serializer_style = StyleSerializer

    @action(detail=False, methods=['get'])
    def random(self, request):
        """
            get:
            Return random painting from list of all paintings.

        """
        paint = Painting.objects.order_by('?').first()
        serializer = self.serializer_paint(paint, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def variants(self, request, pk=None):
        """
            get:
            Return a set of three distinct variants of answers for the painting specified by id.

            - with a parameter **variants/?type=author**

                return list of three distinct authors' names (which is not the author name of the given painting)

            - with a parameter **variants/?type=name**

                return list of three distinct paintings' names (which is not the name of the given painting)

            - with a parameter **variants/?type=style**

                return list of three distinct styles' names (which is not the style name of the given painting)

        """
        variants = []
        type_ = self.request.query_params.get('type')

        if type_ == 'author':
            paint_author_id = Painting.objects.get(id=pk).author.id

            author_names = list(Author.objects.exclude(id=paint_author_id).values_list('id', flat=True))
            variants = list(Author.objects.filter(pk__in=random.sample(author_names, 3)).values_list('name', flat=True))

        if type_ == 'name':
            paint_id = Painting.objects.get(id=pk).id

            paint_names = list(Painting.objects.exclude(id=paint_id).values_list('id', flat=True))
            variants = list(
                Painting.objects.filter(pk__in=random.sample(paint_names, 3)).values_list('name', flat=True))

        if type_ == 'style':
            paint_style_id = Painting.objects.get(id=pk).style.id

            style_names = list(Style.objects.exclude(id=paint_style_id).values_list('id', flat=True))
            variants = list(Style.objects.filter(pk__in=random.sample(style_names, 3)).values_list('name', flat=True))

        if variants is not None:
            return Response(variants)
        else:
            return Response(self.serializer_paint.errors, status=status.HTTP_400_BAD_REQUEST)
