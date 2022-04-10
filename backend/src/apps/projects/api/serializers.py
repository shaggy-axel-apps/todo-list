from rest_framework.serializers import ModelSerializer

from apps.projects.models import Issue, Project, Label
from apps.users.api.serializers import UserSerializer


class ProjectSerializer(ModelSerializer):
    contributors = UserSerializer(many=True, required=False)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project
        exclude = ('id',)


class LabelSerializer(ModelSerializer):
    class Meta:
        model = Label
        exclude = ('id',)


class IssueSerializer(ModelSerializer):
    owner = UserSerializer(read_only=True)
    assignees = UserSerializer(many=True, required=False)
    project = ProjectSerializer()
    labels = LabelSerializer(many=True)

    class Meta:
        model = Issue
        fields = (
            'title', 'description', 'project',
            'is_open', 'owner', 'assignees', 'labels')
