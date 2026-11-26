from urllib.parse import unquote, urlsplit

from django import template


register = template.Library()


@register.filter
def channel_entries(contacts, channel):
    entries = []
    for contact in contacts:
        value = getattr(contact, channel, "")
        if not value:
            continue
        if channel == "phone":
            href, display = "tel:" + contact.dial, value
        else:
            href = value
            address = urlsplit(value)
            display = address.netloc + unquote(address.path).rstrip("/")
        entries.append({"title": contact.title, "href": href, "display": display})
    return entries
