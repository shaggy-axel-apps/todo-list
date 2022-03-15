from django.contrib.auth import get_user_model

from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class TestProfile(APITestCase):
    def setUp(self):
        self.user_data = {
            "username": "test_user", "email": "test_user@gmail.com",
            "first_name": "Test", "last_name": "User",
            "password": "testuser123"
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_request_without_auth(self):
        data = {"first_name": "Ruslan"}
        # before login
        response = self.client.get(reverse_lazy('user-profile'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, response.data)
        response = self.client.patch(reverse_lazy('user-profile'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, response.data)

        # after login
        self.client.force_login(user=self.user)
        response = self.client.get(reverse_lazy('user-profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.data)
        response = self.client.patch(reverse_lazy('user-profile'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.data)
        self.assertEqual(response.data["first_name"], data["first_name"], response.data)
