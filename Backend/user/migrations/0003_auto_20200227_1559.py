# Generated by Django 3.0.3 on 2020-02-27 12:59

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0002_auto_20200227_1554'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Stats',
            new_name='Statistics',
        ),
    ]