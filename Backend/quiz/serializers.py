from rest_framework import serializers

from quiz.models import Painting, Author, Style


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class PaintingSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
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
