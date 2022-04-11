from rest_framework.serializers import ModelSerializer, ValidationError

from apps.projects.models import Issue, Project, Label
from apps.users.api.serializers import UserShortSerializer


class ProjectSerializer(ModelSerializer):
    contributors = UserShortSerializer(many=True, required=False)
    owner = UserShortSerializer(read_only=True)

    class Meta:
        model = Project
        exclude = ('id',)


class ProjectShortSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('repository',)

    def validate_repository(self, value: str):
        if not value.startswith(("http://", "https://")):
            raise ValidationError("project repository url invalid", code="invalid")
        domain = value.replace("http://", "").replace("https://", "").split('/')[0]
        if domain not in ("github.com", "gitlab.com", "bitbucket.com"):
            raise ValidationError("project repository url invalid", code="invalid")
        return value


class LabelSerializer(ModelSerializer):
    class Meta:
        model = Label
        exclude = ('id',)


class LabelShortSerializer(ModelSerializer):
    class Meta:
        model = Label
        fields = ('title',)


class IssueSerializer(ModelSerializer):
    owner = UserShortSerializer(read_only=True)
    assignees = UserShortSerializer(many=True, required=False)
    project = ProjectShortSerializer()
    labels = LabelShortSerializer(many=True, required=False)

    class Meta:
        model = Issue
        exclude = ('id', 'created', 'closed')
