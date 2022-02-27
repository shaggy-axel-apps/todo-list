from rest_framework.viewsets import GenericViewSet
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.users.models import User
from .mixins import UserMixin
from .paginations import StandardResultsSetPagination
from .serializers import UserSerializer, UserDetailSerializer
from .permissions import IsAdminOrReadOnly


class UserViewSet(UserMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = StandardResultsSetPagination
    permission_class = IsAdminOrReadOnly


class UserDetailApiView(views.APIView):
    """ API-Представление одного пользователя """
    permission_class = IsAuthenticated
    serializer_class = UserDetailSerializer

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = self.serializer_class(request.user, request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
