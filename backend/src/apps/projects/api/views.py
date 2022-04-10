from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from apps.projects.models import Issue, Project, Label
from .filters import IssueFilter, ProjectFilter
from .serializers import (
    IssueSerializer, ProjectSerializer, LabelSerializer)
from .paginations import ProjectPagination, IssuePagination
from .permissions import IsOwnerOrReadOnly, IsPublicOrForbidden


class IssueViewSet(ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    pagination_class = IssuePagination
    filterset_class = IssueFilter
    permission_class = IsAuthenticatedOrReadOnly

    def destroy(self, request, *args, **kwargs) -> Response:
        instance = self.get_object()
        instance.is_open = False
        instance.closed = datetime.now()
        instance.save()
        serializer = self.serializer_class(instance)
        return Response(
            data=serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter
    permission_classes = (
        IsOwnerOrReadOnly, IsPublicOrForbidden
    )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)


class LabelViewSet(ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
