from rest_framework.viewsets import GenericViewSet

from apps.users.models import User
from .mixins import UserMixin
from .paginations import StandardResultsSetPagination
from .serializers import UserSerializer
from .permissions import IsAdminOrReadOnly


class UserViewSet(UserMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = StandardResultsSetPagination
    permission_class = IsAdminOrReadOnly
