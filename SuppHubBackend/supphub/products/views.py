import csv
import io
from django.shortcuts import redirect
from rest_framework import routers, serializers, viewsets, permissions

from .models import Product, Promocode

from rest_framework.response import Response


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class PromocodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocode
        fields = "__all__"


class ProductAPIViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


def handle_csv_import(request, callback):
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
            callback(row)
        except:
            raise ValueError(f"Error processing row: {row}")
        
        total += 1

    print(f"{total} items uploaded to the database.")

    return redirect(request.META.get("HTTP_REFERER", "/"))


def import_products(request):
    def callback(row):
        Product.objects.create(name=row["name"], price=int(row["price"]),
            hitBool=int(row["hitBool"]), veganBool=int(row["veganBool"]), img=row["img"])
    
    return handle_csv_import(request, callback)


def import_promocodes(request):
    def callback(row):
        Promocode.objects.create(code=row["code"], discount=row["discount"])
    
    return handle_csv_import(request, callback)


router = routers.DefaultRouter()
router.register(r"products", ProductAPIViewSet, basename="products")
