from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin

from quiz.models import Painting, Author, Style


class PaintingSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Painting
        fields = "__all__"


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = "__all__"
