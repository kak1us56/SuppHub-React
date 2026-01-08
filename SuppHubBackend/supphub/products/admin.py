from django.contrib import admin

from .models import Product, Promocode


# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "id"]


@admin.register(Promocode)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["code", "discount", "usages_amount", "id"]
    list_filter = ["discount", "usages_amount"]
