from django.contrib.auth.models import User
from django.db import models

USER_PROFILE_DATA = (
    'first_name',
    'last_name',
    'nickname',
    'avatar',
    'win_rate',
    'games_total',
    'wins_total',
    'pictures_seen'
)


class UserProfile(models.Model):
    """
    Extra data for user. (Adding new filed here make sure that you added its
    name to USER_PROFILE_DATA)
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    nickname = models.CharField(max_length=250, unique=True)
    avatar = models.ImageField(default="default.png")

    win_rate = models.FloatField(default=0, null=False)
    games_total = models.PositiveIntegerField(default=0, null=False)
    wins_total = models.PositiveIntegerField(default=0, null=False)
    pictures_seen = models.PositiveIntegerField(default=0, null=False)

    def __str__(self):
        return self.user.username
