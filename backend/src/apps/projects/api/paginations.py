from rest_framework.pagination import PageNumberPagination


class ProjectPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class IssuePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
