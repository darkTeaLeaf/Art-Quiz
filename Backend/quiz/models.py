from django.core.validators import MaxValueValidator
from django.db import models
from django.utils.datetime_safe import datetime


class Style(models.Model):
    name = models.CharField(max_length=100)
    century = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=500)
    country = models.CharField(max_length=200)
    style = models.ForeignKey(Style, on_delete=models.CASCADE)
    birth_date = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(datetime.now().year)],
        help_text="Use the following format: <YYYY>", null=True)
    dead_day = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(datetime.now().year)],
        help_text="Use the following format: <YYYY>", null=True)

    def __str__(self):
        return self.name


class Painting(models.Model):
    name = models.CharField(max_length=200)
    author = models.ManyToManyField(Author)
    year = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(datetime.now().year)],
        help_text="Use the following format: <YYYY>")
    style = models.ForeignKey(Style, on_delete=models.CASCADE)
    gallery = models.CharField(max_length=500)
    image = models.ImageField(blank=False, null=False, upload_to="paintings/")

    def __str__(self):
        return self.name
