from rest_framework import serializers

from user.models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
