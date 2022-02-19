from rest_framework import mixins


class UserMixin(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    pass
