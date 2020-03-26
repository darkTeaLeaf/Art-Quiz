import random

from rest_framework import viewsets, status, mixins, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from quiz.models import Painting, Author, Style
from quiz.permissions import QuizPermission
from quiz.serializers import PaintingSerializer, AuthorSerializer, StyleSerializer


class PaintingViewSet(viewsets.ModelViewSet):
    """
        retrieve:
        Return the painting specified by id.

        list:
        Return a list of all the existing paintings.

        create:
        Create a new painting.

        update:
        Update of all painting fields. Request should contain all painting parameters.

        partial_update:
        Update of all or some of painting fields. There is no requirement to contain all the parameters.

        delete:
        Delete the painting specified by id.

    """
    queryset = Painting.objects.all()
    serializer_paint = PaintingSerializer
    serializer_author = AuthorSerializer
    serializer_style = StyleSerializer
    permission_classes = (QuizPermission,)

    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

    def get_serializer_class(self):
        return self.serializer_paint

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


class AuthorViewSet(viewsets.ModelViewSet):
    """
        retrieve:
        Return the author specified by id.

        list:
        Return a list of all the existing authors.

        create:
        Create a new author.

        update:
        Update of all author fields. Request should contain all author parameters.

        partial_update:
        Update of all or some of author fields. There is no requirement to contain all the parameters.

        delete:
        Delete the author specified by id.

    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = (QuizPermission,)

    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

    def get_serializer_class(self):
        return self.serializer_class


class StyleViewSet(viewsets.ModelViewSet):
    """
        retrieve:
        Return the style specified by id.

        list:
        Return a list of all the existing style.

        create:
        Create a new style.

        update:
        Update of all style fields. Request should contain all style parameters.

        partial_update:
        Update of all or some of style fields. There is no requirement to contain all the parameters.

        delete:
        Delete the style specified by id.

    """
    queryset = Style.objects.all()
    serializer_class = StyleSerializer
    permission_classes = (QuizPermission,)

    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

    def get_serializer_class(self):
        return self.serializer_class
