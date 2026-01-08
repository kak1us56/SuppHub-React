from django.db import models
from django.core.validators import MinLengthValidator, MaxValueValidator, MinValueValidator


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
    

class Promocode(models.Model):
    class Meta:
        db_table = "promocodes"
    
    code = models.CharField(max_length=8, validators=[MinLengthValidator(8)], null=False)
    discount = models.PositiveIntegerField(validators=[MaxValueValidator(100), MinValueValidator(0)], null=False)
    usages_amount = models.PositiveSmallIntegerField(default=1, null=False)

    def __str__(self):
        return self.code
