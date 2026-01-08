import csv
import io
from django.shortcuts import redirect
from rest_framework import routers, serializers, viewsets, permissions, status
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

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

    permission_classes = [IsAuthenticatedOrReadOnly]


@method_decorator(csrf_exempt, name='dispatch')
class PromocodeAPIViewSet(viewsets.ModelViewSet):
    queryset = Promocode.objects.all()

    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_scope = "promocode"

    @action(methods=["post"], detail=False, url_path=r"check-promocode")
    def check_promocode(self, request: Request) -> Response:
        # serializer = PromocodeSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)

        code_val = request.data.get("code")

        if not code_val:
            return Response({"error": "Промокод не може бути пустим"}, status=status.HTTP_400_BAD_REQUEST)

        db_code = Promocode.objects.get(code=code_val)

        if db_code.usages_amount > 0:
            db_code.usages_amount -= 1
            db_code.save()

            return Response({"success": "Ваш промокод успішно застосований", "discount": db_code.discount}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Ваш промокод більше не дійсний"}, status=status.HTTP_200_OK)


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
router.register(r"promocodes", PromocodeAPIViewSet, basename="promocodes")
