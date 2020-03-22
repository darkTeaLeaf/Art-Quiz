from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Achievement(models.Model):
    """
        Achievements to earn by users.

        Achievement types:
        0 - direct to count amount of victories
        1 - others (counting number of days in a row when login)

    """
    name = models.CharField(max_length=200)
    type = models.PositiveIntegerField(null=False, default=0)
    max_score = models.PositiveIntegerField(null=False)
    image = models.ImageField(blank=False, null=False, upload_to="achievements/")

    def __str__(self):
        return self.name


class Profile(models.Model):
    """
    Extra data for user.

    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(null=True, blank=True, upload_to="users/")
    achievements = models.ManyToManyField(Achievement, through='Progress')

    def __str__(self):
        return self.user.username + "Profile"

    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
        instance.profile.save()


class Progress(models.Model):
    """
        Many to many table with each achievement progress for each user.

    """
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    progress = models.PositiveIntegerField(default=0, null=False)

    def __str__(self):
        return self.profile.user.username + ' ' + self.achievement.name

    @receiver(post_save, sender=Profile)
    def create_or_update_user_achievements_profile(sender, instance, created, **kwargs):
        if created:
            achievements = Achievement.objects.all()
            Progress.objects.bulk_create([Progress(profile=instance, achievement=n) for n in achievements])

    @receiver(post_save, sender=Achievement)
    def create_or_update_user_achievements_achievement(sender, instance, created, **kwargs):
        if created:
            if instance.type is not 0:
                profiles = Profile.objects.all()
                Progress.objects.bulk_create([Progress(profile=n, achievement=instance) for n in profiles])
            else:
                profiles = Profile.objects.all()
                Progress.objects.bulk_create(
                    [Progress(profile=n, achievement=instance, progress=n.user.statistic.games_total) for n in
                     profiles])

    @property
    def reached(self):
        if self.progress == self.achievement.max_score:
            return True
        return False


class Statistic(models.Model):
    """
        Statistics for user.

    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    games_total = models.PositiveIntegerField(default=0, null=False)
    wins_total = models.PositiveIntegerField(default=0, null=False)

    def __str__(self):
        return self.user.username + "Statistic"

    @receiver(post_save, sender=User)
    def create_or_update_user_statistic(sender, instance, created, **kwargs):
        if created:
            Statistic.objects.create(user=instance)
        instance.statistic.save()

    @property
    def win_rate(self):
        if self.games_total == 0:
            return 0
        return self.wins_total / self.games_total
