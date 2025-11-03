from django.contrib import admin
from django.urls import include, path

from products.views import router as products_router
from products.views import import_products
from tgbot.views import submit_order

urlpatterns = [
    path("admin/products/product/import-products/", import_products, name="import_products"),
    path("admin/", admin.site.urls),
    path("", include(products_router.urls)),
    path("submit/", submit_order, name="submit_order"),
]
