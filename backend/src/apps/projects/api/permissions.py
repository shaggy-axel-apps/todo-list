from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """ The requested user is owner, or is a read-only request. """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.owner or request.method in SAFE_METHODS


class IsPublicOrDenied(BasePermission):
    """ The public project, or not allow """
    def has_object_permission(self, request, view, obj):
        return (
            obj.is_public or
            request.user in obj.contributors.all() or
            request.user == obj.owner
        )
