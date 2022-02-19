from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import SimpleRouter

from apps.users.api.views import UserViewSet
from apps.projects.api.views import IssueViewSet, ProjectViewSet, LabelViewSet


router = SimpleRouter()
router.register('users', UserViewSet)
router.register('issues', IssueViewSet)
router.register('projects', ProjectViewSet)
router.register('labels', LabelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
