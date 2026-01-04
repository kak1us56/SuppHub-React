import json

import requests
from rest_framework import status
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from shared.cache import CacheService
from sendsms.services import SMSService
from sendsms.models import SMSMessage, SMSStatus

TELEGRAM_API_URL = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}"


@csrf_exempt
def submit_order(request):
    cache = CacheService()

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            submitted_code = int(data.get("code"))
            cache_code = int(cache.get("sms_code", data.get("sms_id"))["code"])

            message_data = data.get("data")
            
            if submitted_code == cache_code:
                message = (
                    f"Ім'я: {message_data.get('inputNameValue')};\n"
                    f"Фамілія: {message_data.get('inputVornameValue')};\n"
                    f"Номер телефону: {message_data.get('inputTelValue')};\n\n"
                    f"Адреса:\n"
                    f"Область: {message_data.get('regionSelectValue')}\n"
                    f"Місто: {message_data.get('citySelectValue')}\n"
                    f"Відділення: {message_data.get('warehouseSelectValue')}\n\n"
                    f"{message_data.get('checkboxCallMeValue')}\n"
                    f"Коментарій:\n{message_data.get('textareaCommentValue')}\n\n"
                    f"Замовлення:\n{message_data.get('orderText')}\n"
                    f"Сума: {message_data.get('fullSummMsg')} грн"
                )

                res1 = requests.post(
                    f"{TELEGRAM_API_URL}/sendMessage", data={"chat_id": settings.CHAT_ID1, "text": message}
                )

                # payload = {
                #     "phone_number": message_data.get('inputTelValue'),
                #     "name": message_data.get('inputNameValue'),
                #     "surname": message_data.get('inputVornameValue'),
                #     "city": message_data.get('citySelectValue'),
                #     "region": message_data.get('regionSelectValue'),
                #     "warehouse": message_data.get('warehouseSelectValue'),
                #     "order": message_data.get('orderText')
                # }
                # requests.post(
                #     "http://127.0.0.1:8000/sms/send_confirmation/",
                #     json=payload
                # )


                try:
                    phone = message_data.get('inputTelValue')
                    confirmation_sms = SMSMessage.objects.create(
                        phone_number=phone,
                        status=SMSStatus.PENDING
                    )

                    sms_service = SMSService()
                    sms_service.send_confirmation_sms(
                        phone_number=phone,
                        sms_id=confirmation_sms.id,
                        name=message_data.get('inputNameValue'),
                        surname=message_data.get('inputVornameValue'),
                        city=message_data.get('citySelectValue'),
                        region=message_data.get('regionSelectValue'),
                        warehouse=message_data.get('warehouseSelectValue'),
                        order=message_data.get('orderText')
                    )
                    print(f"Confirmation SMS sent to {phone}, ID: {confirmation_sms.id}")

                except Exception as e:
                    print(f"!!! Failed to send confirmation SMS: {e}")
                    if 'confirmation_sms' in locals():
                        confirmation_sms.status = SMSStatus.FAILED
                        confirmation_sms.save()

                return JsonResponse({"success": True}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"error": "Wrong code"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({"error": "Only POST allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
