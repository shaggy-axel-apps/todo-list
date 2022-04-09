from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from apps.users.api.serializers import UserSerializer
from apps.projects.models import Issue, Project, Label
from .filters import IssueFilter, ProjectFilter
from .serializers import (
    IssueSerializer, ProjectSerializer, LabelSerializer)
from .paginations import ProjectPagination, IssuePagination
from .permissions import IsOwnerOrReadOnly, IsPublicOrDenied


class IssueViewSet(ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    pagination_class = IssuePagination
    filterset_class = IssueFilter
    permission_class = AllowAny

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_open = False
        instance.closed = datetime.now()
        instance.save()
        serializer = self.serializer_class(instance)
        return Response(
            data=serializer.data, status=status.HTTP_200_OK)


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter
    permission_classes = (IsOwnerOrReadOnly, IsPublicOrDenied)

    def create(self, request, *args, **kwargs):
        request.data['owner'] = UserSerializer(request.user).data
        return super().create(request, *args, **kwargs)


class LabelViewSet(ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
