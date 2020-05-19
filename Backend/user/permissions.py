from rest_framework import permissions


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ['create']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy', 'list', 'retrieve']:
            return True
        elif view.action in ['win', 'lose']:
            return request.user.is_staff
        else:
            return False

    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated

        if view.action in ['create']:
            return True

        if not request.user.is_authenticated:
            return False

        if view.action in ['update', 'partial_update', 'list', 'retrieve']:
            return obj == request.user or request.user.is_staff
        elif view.action in ['destroy']:
            return request.user.is_staff
        else:
            return False


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permission to only allow authors of an request to view it,
    and only admin accept and edit.
    """

    def has_permission(self, request, view):
        if view.action in ['create', 'list', 'retrieve']:
            return True
        elif view.action in ['update', 'partial_update', 'destroy', 'accept', 'decline', 'edit']:
            return request.user.is_staff
        else:
            return False

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_staff
