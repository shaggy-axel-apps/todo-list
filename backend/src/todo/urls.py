from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import SimpleRouter

from apps.users.api.views import UserViewSet, UserDetailApiView
from apps.projects.api.views import IssueViewSet, ProjectViewSet, LabelViewSet


router = SimpleRouter()
router.register('users', UserViewSet, 'users')
router.register('issues', IssueViewSet, 'issues')
router.register('projects', ProjectViewSet, 'projects')
router.register('labels', LabelViewSet, 'labels')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/auth/', include('apps.api_auth.urls')),

    path('api/', include(router.urls)),
    path('api/profile/', UserDetailApiView.as_view(), name="user-profile"),
]
