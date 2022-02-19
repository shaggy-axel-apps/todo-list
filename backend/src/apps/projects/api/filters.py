from django_filters import rest_framework as filters
from apps.projects.models import Issue, Project


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ('title',)


class IssueFilter(filters.FilterSet):
    created = filters.DateFilter()
    closed = filters.DateFilter()

    class Meta:
        model = Issue
        fields = ('created', 'closed')
