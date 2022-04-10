from datetime import datetime

from colorfield.fields import ColorField
from django.db import models

from apps.users.models import User


class Project(models.Model):
    title = models.CharField(max_length=64)
    repository = models.URLField("Link to Repository", unique=True)
    contributors = models.ManyToManyField(User, null=True, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owner",
        blank=True)
    is_public = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        unique_together = ("title", "owner")


class Label(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    color = ColorField(format='hexa')

    def __str__(self) -> str:
        return self.title


class Issue(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    labels = models.ManyToManyField(Label, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issue_owner')
    assignees = models.ManyToManyField(User, related_name='issue_assignees')
    is_open = models.BooleanField(default=True)
    created = models.DateTimeField(
        auto_created=True, default=datetime.now)
    closed = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.project.title} - {self.title}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['title', 'project'],
                condition=models.Q(is_open=True),
                name='unique_title_repository_isopen')
        ]
