import json

import requests
from rest_framework import status
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from shared.cache import CacheService

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
                    f"Сума: {data.get('fullSummMsg')} грн"
                )

                res1 = requests.post(
                    f"{TELEGRAM_API_URL}/sendMessage", data={"chat_id": settings.CHAT_ID1, "text": message}
                )

                return JsonResponse({"success": True, "telegram_response": res1.json()}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({"error": "Wrong code"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({"error": "Only POST allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
