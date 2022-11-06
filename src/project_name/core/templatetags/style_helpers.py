import json

from django import template
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django_vite.templatetags.django_vite import (DJANGO_VITE_DEV_MODE,
                                                  DJANGO_VITE_MANIFEST_PATH,
                                                  DjangoViteAssetLoader)

register = template.Library()


STYLE_ENTRY_PATH = 'src/app/style.js'


@register.simple_tag
def style_css_assets() -> str:
    try:
        manifest_file = open(DJANGO_VITE_MANIFEST_PATH, "r")
        manifest_content = manifest_file.read()
        manifest_file.close()
        manifest = json.loads(manifest_content)
    except Exception as error:
        raise RuntimeError(
            f"Cannot read Vite manifest file at "
            f"{DJANGO_VITE_MANIFEST_PATH} : {str(error)}"
        )

    hashed_style_name = '/static/' + manifest[STYLE_ENTRY_PATH]['css'][0]

    return format_html(
        '<link rel="preload" href="{}" as="style"><link href="{}" type="text/css" rel="stylesheet">',
        hashed_style_name,
        hashed_style_name,
    )


@register.simple_tag
@mark_safe
def dev_style_loader() -> str:
    """Returns a django_vite loader only in development"""
    if not DJANGO_VITE_DEV_MODE:
        return ''
    return DjangoViteAssetLoader.instance().generate_vite_asset(STYLE_ENTRY_PATH)
