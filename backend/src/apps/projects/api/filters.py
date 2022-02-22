from django_filters import rest_framework as filters
from apps.projects.models import Issue, Project


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ('title',)


class IssueFilter(filters.FilterSet):
    min_date = filters.DateFilter(
        field_name="create", lookup_expr="gte",
        input_formats=["%Y-%m-%dT%H:%M"])
    max_date = filters.DateFilter(
        field_name="create", lookup_expr="lte",
        input_formats=["%Y-%m-%dT%H:%M"])

    class Meta:
        model = Issue
        fields = ('min_date', 'max_date')
