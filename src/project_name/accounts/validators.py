from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from .reserved_usernames import reserved_usernames


def validate_no_at_symbol(value):
    if '@' in value:
        raise ValidationError(
            _("Username cannot contain @ symbol"))


def username_not_in_reserved_usernames(value):
    if value in reserved_usernames:
        raise ValidationError(
            _("Username is reserved"))


def validate_username_at_least_4_characters(value):
    if len(value) < 4:
        raise ValidationError(
            _("Username must be at least 4 characters long"))
