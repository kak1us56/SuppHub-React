from django.contrib import admin
from ckeditor.widgets import CKEditorWidget
from django.utils.html import format_html 

from .models import Product, Promocode


# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "amount", "id"]
    search_fields = ["name"]


@admin.register(Promocode)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["code", "discount", "usages_amount", "id"]
    list_filter = ["discount", "usages_amount"]
