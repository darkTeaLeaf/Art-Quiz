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

        request = self.context['request']

        if hasattr(request, 'query_params'):
            fields = request.query_params.get('fields')

            if fields:
                fields = fields.split(',')
                # Drop any fields that are not specified in the `fields` argument.
                allowed = set(fields)
                existing = set(self.fields.keys())
                for field_name in existing - allowed:
                    self.fields.pop(field_name)


class AuthorSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'country', 'style', 'birth_date', 'dead_day')
        read_only_fields = ('id',)


class StyleSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ('id', 'name', 'century')
        read_only_fields = ('id',)


class PaintingSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.name')
    style_name = serializers.ReadOnlyField(source='style.name')

    class Meta:
        model = Painting
        fields = ('id', 'name', 'author_name', 'author', 'year', 'style_name', 'style', 'gallery', 'image')
        read_only_fields = ('id',)
        extra_kwargs = {'author': {'write_only': True},
                        'style': {'write_only': True}}

    def to_representation(self, instance):
        response = super(PaintingSerializer, self).to_representation(instance)
        if instance.image and 'image' in response:
            response['image'] = instance.image.url
        return response
