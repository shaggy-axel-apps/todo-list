from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.users.api.views import UserViewSet


router = DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
