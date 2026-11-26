from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin, messages
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import path, reverse
from django.views.decorators.http import require_GET, require_http_methods

from .forms import InstallationForm
from django.core.cache import cache
from django.db import transaction
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta

from .models import Installation, ManagerContact, Product
from .notifications import enqueue


@require_http_methods(["GET", "POST"])
def storefront(request):
    if request.method == "POST":
        return contact(request)
    if "topic" in request.GET:
        topic = request.GET["topic"]
        if topic not in Installation.Topic.values:
            topic = Installation.Topic.INSTALL
        return redirect(reverse("contact") + "?topic=" + topic + "#installation")
    category = request.GET.get("category")
    if category == Product.Category.ACCESSORIES:
        return redirect("accessories")
    if category in (Product.Category.POOL, Product.Category.SNOOKER):
        return redirect(reverse("tables") + "?category=" + category)
    return render(request, "shop/index.html")


@require_http_methods(["GET", "POST"])
def contact(request):
    selected = request.POST.get("topic") if request.method == "POST" else request.GET.get("topic", "")
    page_topic = selected if selected in Installation.Topic.values else ""
    if selected not in Installation.Topic.values:
        selected = Installation.Topic.INSTALL
    form = InstallationForm(request.POST if request.method == "POST" else None, initial={"topic": selected})
    if request.method == "POST" and form.is_valid():
        since = timezone.now() - timedelta(minutes=15)
        same_contact = Q(phone=form.cleaned_data["phone"])
        if form.cleaned_data["email"]:
            same_contact |= Q(email__iexact=form.cleaned_data["email"])
        key = "contact-limit:" + str(request.META.get("REMOTE_ADDR", "local"))
        if Installation.objects.filter(same_contact, created_at__gte=since).count() >= 3:
            form.add_error(None, "چند درخواست برای این شماره یا ایمیل ثبت شده است. لطفاً بعداً تلاش کنید.")
        elif cache.get(key, 0) >= 12:
            form.add_error(None, "تعداد درخواست‌ها زیاد است. لطفاً کمی بعد دوباره تلاش کنید.")
        else:
            with transaction.atomic():
                inquiry = form.save()
                enqueue(inquiry)
            cache.add(key, 0, 900)
            cache.incr(key)
            messages.success(request, f"درخواست شما ثبت شد. کد پیگیری: {inquiry.pk}", extra_tags="inquiry-receipt")
            return redirect(reverse("contact") + "#installation")
    return render(request, "shop/contact.html", {
        "form": form, "nav_page": "contact", "contacts": ManagerContact.objects.filter(public=True),
        "invalid": request.method == "POST", "page_topic": page_topic,
    }, status=400 if request.method == "POST" else 200)


@require_GET
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk, published=True)
    return render(request, "shop/product.html", {"product": product, "contact_topic": "install",
        "nav_page": "accessories" if product.category == Product.Category.ACCESSORIES else "tables"})


@require_GET
def catalog(request, tables):
    products = Product.objects.filter(published=True)
    products = (products.exclude(category="accessories") if tables else products.filter(category="accessories"))
    category = request.GET.get("category", "") if tables else ""
    if category in (Product.Category.POOL, Product.Category.SNOOKER):
        products = products.filter(category=category)
    else:
        category = ""
    return render(request, "shop/catalog.html", {
        "products": products, "tables": tables, "category": category, "contact_topic": "install",
        "nav_page": "tables" if tables else "accessories",
        "title": {"pool": "میزهای پول", "snooker": "میزهای اسنوکر"}.get(category, "مجموعهٔ میزها" if tables else "دیگر محصولات"),
    })


@require_GET
def repairs(request):
    return redirect(reverse("contact") + "?topic=repair", permanent=True)


urlpatterns = [
    path("contact/", contact, name="contact"),
    path("repairs/", repairs, name="repairs"),
    path("tables/", catalog, {"tables": True}, name="tables"),
    path("accessories/", catalog, {"tables": False}, name="accessories"),
    path("", storefront, name="storefront"),
    path("product/<int:pk>/", product_detail, name="product"),
    path("admin/", admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
