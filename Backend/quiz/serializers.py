from rest_framework import serializers

from quiz.models import Painting, Author, Style


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        fields = self.context['request'].query_params.get('fields')

        if fields:
            fields = fields.split(',')
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"
        read_only_fields = ('id',)


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = "__all__"
        read_only_fields = ('id',)


class PaintingSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    author = AuthorSerializer()
    style = StyleSerializer()

    class Meta:
        model = Painting
        fields = ('name', 'author', 'year', 'style', 'gallery', 'image')
        read_only_fields = ('id',)

    def to_representation(self, instance):
        response = super(PaintingSerializer, self).to_representation(instance)
        if instance.image:
            response['image'] = instance.image.url
        return response
