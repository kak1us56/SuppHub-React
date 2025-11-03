import csv
import io
from django.shortcuts import redirect
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import permission_classes

from .models import Product

from rest_framework.request import Request
from rest_framework.response import Response


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductAPIViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


def import_products(request):
    if not request.user.is_superuser:
        return Response({"detail": "You do not have permission to perform this action."}, status=403)

    if request.method != "POST":
        raise ValueError("Only POST requests are allowed.")

    csv_file = request.FILES.get("file")
    if csv_file is None:
        raise ValueError("CSV file not found.")

    decoded = csv_file.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(decoded))
    total = 0

    for row in reader:
        try:
            Product.objects.create(name=row["name"], price=int(row["price"]),
                hitBool=int(row["hitBool"]), veganBool=int(row["veganBool"]), img=row["img"])
        except:
            raise ValueError(f"Error processing row: {row}")
        
        total += 1

    print(f"{total} products uploaded to the database.")

    return redirect(request.META.get("HTTP_REFERER", "/"))


router = routers.DefaultRouter()
router.register(r"products", ProductAPIViewSet, basename="products")
