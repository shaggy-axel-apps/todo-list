from django.contrib import admin

from apps.users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email',
                    'first_name', 'last_name')

    fieldsets = (
        (None, {'fields': (
            'username', 'password',
            'first_name', 'last_name',
        )}),
        ('Permissions', {'fields': (
            'is_staff', 'is_active',
        )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'password1', 'password2',
                'email', 'first_name', 'last_name',
                'is_staff', 'is_active',
            ),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ()
    filter_horizontal = ()
