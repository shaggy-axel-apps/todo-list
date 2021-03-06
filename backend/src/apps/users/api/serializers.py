from rest_framework.serializers import ModelSerializer

from apps.users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('id',)
