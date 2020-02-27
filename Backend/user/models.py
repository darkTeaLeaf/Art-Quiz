from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    """
    Extra data for user. (Adding new filed here make sure that you added its
    name to USER_PROFILE_DATA)
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default="default.png")

    def __str__(self):
        return self.user.username + "Profile"

    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
        instance.profile.save()


class Statistic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    win_rate = models.FloatField(default=0, null=False)
    games_total = models.PositiveIntegerField(default=0, null=False)
    wins_total = models.PositiveIntegerField(default=0, null=False)
    pictures_seen = models.PositiveIntegerField(default=0, null=False)

    def __str__(self):
        return self.user.username + "Statistic"

    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        if created:
            Statistic.objects.create(user=instance)
        instance.statistic.save()
