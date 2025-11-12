import enum
from django.db import models


class SMSStatus(enum.StrEnum):
    PENDING = enum.auto()
    SENT = enum.auto()
    FAILED = enum.auto()

    @classmethod
    def choices(cls):
        results = []

        for _element in cls:
            _element = (_element.value, _element.name.replace("_", " ").lower().capitalize())
            results.append(_element)

        return results

# class StatusChoices(models.TextChoices):
#     PENDING = "pending", "Pending"
#     SENT = "sent", "Sent"
#     FAILED = "failed", "Failed"

class SMSMessage(models.Model):
    class Meta:
        db_table = "sms_messages"

    phone_number = models.CharField(max_length=15)
    status = models.CharField(max_length=20, default=SMSStatus.PENDING, choices=SMSStatus.choices)
    sent_at = models.DateTimeField(auto_now_add=True)

    def _normalize_phone_number(self, phone_number: str) -> str:
        if not phone_number:
            raise ValueError("phone_number cannot be empty")

        phone_number = "".join(filter(str.isdigit, phone_number))
        
        if "380" not in phone_number and phone_number[0] == "0":
            phone_number = "38" + phone_number
        
        if len(phone_number) == 12:
            return phone_number
        else:
            raise ValueError

    def save(self, *args, **kwargs):
        self.phone_number = self._normalize_phone_number(self.phone_number)

        self.full_clean(exclude=['phone_number'])
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"SMS to {self.phone_number} at {self.sent_at}"
