from django.contrib.auth import get_user_model

from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class TestUserViewSet(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username="admin", password="admin123987")

        self.user_data = {
            "username": "testuser", "password": "testuser123",
            "first_name": "Test", "last_name": "User",
            "email": "testuser@gmail.com"}
        self.user = User.objects.create_user(**self.user_data)

        self.user_data_for_create = {
            "username": "testuser1", "password": "testuser123",
            "email": "testuser1@gmail.com"}

    def test_get_users(self):
        response = self.client.get(reverse_lazy('users-list'))
        self.assertEquals(response.status_code,
                          status.HTTP_200_OK,
                          response.status_text)

    def test_create_user(self):
        response = self.client.post(
            reverse_lazy('users-list'),
            bytes(str(self.user_data_for_create), encoding="utf-8"),
            content_type="application/json")
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_detail_user(self):
        response = self.client.get(reverse_lazy(
            'users-detail', kwargs={'pk': self.user.id}))
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        response = self.client.get(reverse_lazy(
            'users-detail', kwargs={'pk': self.user.id}))
        user_data = response.data

        response = self.client.patch(
            reverse_lazy('users-detail', kwargs={'pk': self.user.id}),
            b'{"first_name": "Ruslan"}', content_type="application/json")
        self.assertEquals(response.status_code,
                          status.HTTP_200_OK,
                          response.data)

        updated_data = response.data
        self.assertNotEquals(
            user_data, updated_data,
            "data was not updated")

    def test_delete_user(self):
        response = self.client.delete(reverse_lazy(
            'users-detail', kwargs={'pk': self.user.id}))
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
