from rest_framework.viewsets import ModelViewSet

from apps.projects.models import Issue, Project, Label
from apps.projects.api.serializers import IssueSerializer, ProjectSerializer, LabelSerializer
from apps.users.api.paginations import StandardResultsSetPagination


class IssueViewSet(ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    pagination_class = StandardResultsSetPagination


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = StandardResultsSetPagination


class LabelViewSet(ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    pagination_class = StandardResultsSetPagination
