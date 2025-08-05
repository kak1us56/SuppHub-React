from django.shortcuts import render
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Product

# Create your views here.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductAPIViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


router = routers.DefaultRouter()
router.register(r'products', ProductAPIViewSet, basename="products")