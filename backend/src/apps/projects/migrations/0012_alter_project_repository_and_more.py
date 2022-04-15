# Generated by Django 4.0.2 on 2022-04-10 17:54

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0011_alter_project_contributors_alter_project_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='repository',
            field=models.URLField(unique=True, verbose_name='Link to Repository'),
        ),
        migrations.AlterUniqueTogether(
            name='project',
            unique_together={('title', 'owner')},
        ),
        migrations.AddConstraint(
            model_name='issue',
            constraint=models.UniqueConstraint(condition=models.Q(('is_open', True)), fields=('title', 'project'), name='unique_title_repository_isopen'),
        ),
    ]
