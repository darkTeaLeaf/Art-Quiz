from django.contrib import admin

from user.models import Profile, Statistic, Achievement, Progress, Request

admin.site.register(Profile)
admin.site.register(Statistic)
admin.site.register(Achievement)
admin.site.register(Progress)
admin.site.register(Request)
