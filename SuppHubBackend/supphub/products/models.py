from django.db import models
from django.core.validators import MinLengthValidator, MaxValueValidator, MinValueValidator
from ckeditor.fields import RichTextField


# Create your models here.
class Product(models.Model):
    class Meta:
        db_table = "products"

    name = models.CharField(max_length=50, null=False)
    price = models.PositiveIntegerField(null=False)
    hitBool = models.BooleanField(default=False)
    veganBool = models.BooleanField(default=False)
    img = models.ImageField(upload_to='images/', null=True, blank=True)
    amount = models.PositiveIntegerField(null=False, default=0)
    pill_amount = models.CharField(null=True)
    active_ingredients = models.TextField(null=True, blank=True)
    producer_country = models.CharField(null=True)
    pill_form = models.CharField(null=True)
    description = RichTextField(null=True, blank=True)
    certificate = models.ImageField(upload_to='images/', null=True, blank=True)

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
