from rest_framework import views, viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.users.models import User
from .mixins import UserMixin
from .paginations import StandardResultsSetPagination
from .serializers import UserSerializer, UserDetailSerializer
from .permissions import IsAdminOrReadOnly


class UserViewSet(UserMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = StandardResultsSetPagination
    permission_class = IsAdminOrReadOnly


class UserDetailApiView(views.APIView):
    """ API-Представление одного пользователя """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserDetailSerializer

    def get(self, request: Request) -> Response:
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)

    def patch(self, request: Request) -> Response:
        serializer = self.serializer_class(
            request.user, request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
