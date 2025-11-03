import json

import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

TELEGRAM_API_URL = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}"


@csrf_exempt
def submit_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            message = (
                f"Ім'я: {data.get('inputNameValue')};\n"
                f"Фамілія: {data.get('inputVornameValue')};\n"
                f"Номер телефону: {data.get('inputTelValue')};\n\n"
                f"Адреса:\n"
                f"Область: {data.get('regionSelectValue')}\n"
                f"Місто: {data.get('citySelectValue')}\n"
                f"Відділення: {data.get('warehouseSelectValue')}\n\n"
                f"{data.get('checkboxCallMeValue')}\n"
                f"Коментарій:\n{data.get('textareaCommentValue')}\n\n"
                f"Замовлення:\n{data.get('orderText')}\n"
                f"Сума: {data.get('fullSummMsg')} грн"
            )

            res1 = requests.post(
                f"{TELEGRAM_API_URL}/sendMessage", data={"chat_id": settings.CHAT_ID1, "text": message}
            )

            return JsonResponse({"success": True, "telegram_response": res1.json()})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
