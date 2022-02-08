from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from faker import Faker


TEST_USER_QUANTITY = 100
FAKE = Faker()
User = get_user_model()


class Command(BaseCommand):
    help = "Create one superuser, 10 test users"

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Processing... 🚀'))

        # Create superuser
        User.objects.create_superuser(
            username=settings.USERNAME, email=settings.EMAIL, password=settings.PASSWORD,
            first_name=settings.FIRST_NAME, last_name=settings.LAST_NAME)

        # Create test users data
        first_names = [FAKE.unique.first_name() for _ in range(TEST_USER_QUANTITY)]
        last_names = [FAKE.unique.last_name() for _ in range(TEST_USER_QUANTITY)]
        emails = [FAKE.unique.email() for _ in range(TEST_USER_QUANTITY)]
        passwords = [FAKE.unique.password() for _ in range(TEST_USER_QUANTITY)]

        # Create test users
        for fname, lname, email, password in zip(first_names, last_names, emails, passwords):
            username = f"{fname.lower()}_{lname.lower()}"
            User.objects.create_user(
                username=username, email=email,
                first_name=fname, last_name=lname,
                password=password)

        self.stdout.write(self.style.SUCCESS(
            f'Successfully created 🎉\n'
            f'Admin creds:\n  username: {settings.USERNAME}\n  '
            f'email: {settings.EMAIL}\n  password: {settings.PASSWORD}'
        ))
