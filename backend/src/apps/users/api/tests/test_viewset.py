from django.contrib.auth import get_user_model
from django.test import TestCase

from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient

from apps.users.api.views import UserViewSet


User = get_user_model()


class TestUserViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()

        self.user_data1 = {
            "username": "testuser", "password": "testuser123",
            "first_name": "Test", "last_name": "User",
            "email": "testuser@gmail.com"}
        self.user1 = User.objects.create(**self.user_data1)

        self.user_data_for_create = {
            "username": "testuser1", "password": "testuser123",
            "email": "testuser1@gmail.com"}

    def test_get_users(self):
        view = UserViewSet.as_view({'get': 'list'})
        request = self.factory.get(reverse_lazy('users-list'))
        response = view(request)
        self.assertEquals(response.status_code, status.HTTP_200_OK, response.status_text)

    def test_post_users(self):
        response = self.client.post(reverse_lazy('users-list'), data=self.user_data_for_create)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_detail_user(self):
        response = self.client.get(reverse_lazy('users-detail', kwargs={'pk': self.user1.id}))
        self.assertEquals(response.status_code, status.HTTP_200_OK)
