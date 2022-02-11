from colorfield.fields import ColorField
from django.db import models

from apps.users.models import User


class Project(models.Model):
    title = models.CharField(max_length=64)
    repository = models.URLField("Link to Repository")
    contributors = models.ManyToManyField(User)


class Label(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    color = ColorField(format='hexa')


class Issue(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    labels = models.ManyToManyField(Label, blank=True)
    assignees = models.ManyToManyField(User)
    is_open = models.BooleanField(default=True)
