from django.contrib import admin

from .models import SMSMessage

@admin.register(SMSMessage)
class SMSMessageAdmin(admin.ModelAdmin):
    readonly_fields = ["id", "phone_number", "status", "sent_at"]
    list_display = ["__str__", "status", "id"]
    list_filter = ["status"]
    search_fields = ["phone_number"]
