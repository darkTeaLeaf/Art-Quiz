from django.contrib.auth.models import User
from rest_framework import serializers

from user.models import Profile, Statistic, Progress


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


class ProgressSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField(source='achievement.id')
    name = serializers.ReadOnlyField(source='achievement.name')
    max_score = serializers.ReadOnlyField(source='achievement.max_score')
    image = serializers.ImageField(source='achievement.image')

    class Meta:
        model = Progress
        fields = ('id', 'name', 'max_score', 'progress', 'reached', 'image')


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ('id', 'win_rate', 'games_total', 'wins_total')
        read_only_fields = ('id', 'win_rate')


class UserSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    avatar = serializers.ImageField(source="profile.avatar", allow_empty_file=True, required=False)
    achievements = ProgressSerializer(source='profile.progress_set', many=True, read_only=True)
    statistic = StatisticSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_staff', 'avatar', 'achievements',
            'statistic')
        write_only_fields = ('password',)
        read_only_fields = ('id', 'statistic',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])

        profile_data = validated_data.get('profile')

        if profile_data:
            user.profile.avatar = profile_data['avatar']
            user.save()

        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.first_name = validated_data.get('first_name', instance.first_name)

        profile_data = validated_data.get('profile')
        if profile_data:
            instance.profile.avatar = profile_data['avatar']

        instance.save()

        return instance
