from rest_framework import serializers

from quiz.models import Painting


class PaintingSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Painting
        fields = ['id', 'image']
