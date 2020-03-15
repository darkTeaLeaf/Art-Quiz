from rest_framework import permissions


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ['list', 'create', 'retrieve']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return True
        elif view.action in ['win', 'lose']:
            return request.user.is_staff
        else:
            return False

    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        if view.action in ['list', 'create', 'retrieve']:
            return True

        if not request.user.is_authenticated:
            return False

        if view.action in ['update', 'partial_update']:
            return obj == request.user or request.user.is_staff
        elif view.action in ['destroy']:
            return request.user.is_admin
        else:
            return False
