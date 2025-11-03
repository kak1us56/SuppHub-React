from rest_framework import routers, serializers, viewsets

from .models import Product

# from rest_framework.request import Request
# from rest_framework.response import Response


# Create your views here.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductAPIViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


router = routers.DefaultRouter()
router.register(r"products", ProductAPIViewSet, basename="products")
