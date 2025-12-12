import json
from django.http import JsonResponse

from rest_framework import serializers, viewsets, status, routers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator

from .models import SMSMessage, SMSStatus
from .services import SMSService


class SMSMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSMessage
        fields = ['phone_number']


@method_decorator(csrf_exempt, name='dispatch')
class SMSMessageViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    throttle_scope = "sms"
    sms_service = SMSService()

    @action(methods=['post'], detail=False, url_path=r"send-sms-code")
    def send_sms(self, request: Request) -> Response:
        serializer = SMSMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sms_message = serializer.save()


        try:
            generated_code = self.sms_service.send_sms(
                phone_number=request.data.get('phone_number'),
                sms_id=sms_message.id
            )
            
            return Response({"success": "Code sent", "sms_id": sms_message.id}, status=status.HTTP_200_OK)
        
        except ValueError as e:
            SMSMessage.objects.filter(id=sms_message.id).update(status=SMSStatus.FAILED)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            SMSMessage.objects.filter(id=sms_message.id).update(status=SMSStatus.FAILED)
            return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny]) 
def sms_webhook(request: Request):
    print("\n------------SMS webhook is handled-------------")

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)

    print("Received SMS webhook data:", data)

    sms_id = data.get("data")[0].get("data").get("id")

    try:
        SMSMessage.objects.get(id=sms_id)
    except SMSMessage.DoesNotExist:
        raise ValueError(f"The message with {sms_id} doesn`t exist")

    if data.get('success') is True and data.get("data", [{}])[0].get("success") is True:
        SMSMessage.objects.filter(id=sms_id).update(status=SMSStatus.SENT)
    else:
        SMSMessage.objects.filter(id=sms_id).update(status=SMSStatus.FAILED)

    return JsonResponse({"message": "ok"}, status=status.HTTP_200_OK)

router = routers.DefaultRouter()
router.register(prefix="", viewset=SMSMessageViewSet, basename="sms")
