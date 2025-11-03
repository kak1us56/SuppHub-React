from django.db import models


# Create your models here.
class Product(models.Model):
    class Meta:
        db_table = "products"

    name = models.CharField(max_length=50, null=False)
    price = models.PositiveIntegerField(null=False)
    hitBool = models.BooleanField(default=False)
    veganBool = models.BooleanField(default=False)
    img = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name
