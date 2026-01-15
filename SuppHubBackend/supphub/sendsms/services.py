import random
import os
import string
import requests

from shared.cache import CacheService


class SMSService:
    def __init__(self):
        self.api_key = os.getenv("SMSCLUB_API_KEY")
        self.api_url = "https://smsclub.com.ua/api/json.php"
        self.webhook_url = os.getenv("SMS_WEBHOOK_URL")

        self.cache = CacheService()

        if not self.api_key:
            raise ValueError("There is not SMS API in .env")

    def _generate_code(self, k=4) -> str:
        return "".join(random.choices(string.digits, k=k))
    
    def _check_phone_number(self, phone_number: str) -> str:
        if not phone_number:
            raise ValueError("phone_number cannot be empty")

        phone_number = "".join(filter(str.isdigit, phone_number))
        
        if "380" not in phone_number and phone_number[0] == "0":
            phone_number = "38" + phone_number
        
        if len(phone_number) == 12:
            return phone_number
        else:
            raise ValueError
            

    def _form_payload(self, phone_number: str, sms_id: int, message: str) -> dict:
        payload = {
            "auth": self.api_key,
            "data": [
                {
                    "type": "sms",
                    "id": sms_id,
                    "phone": phone_number,
                    "sms_signature": "SuppHub",
                    "sms_message": message,
                    "sms_lifetime": 3600,
                    "short_link": True,
                    "unsubscribe_link": False,
                    "hook": self.webhook_url
                }
            ]
        }

        return payload
    
    def send_sms(self, phone_number: str, sms_id: int, message: str) -> None:
        try:
            validated_phone = self._check_phone_number(phone_number)
        except ValueError as e:
            raise ValueError(f"Not correct phone number {e}")

        payload = self._form_payload(
            phone_number=validated_phone,
            message=message,
            sms_id=sms_id
        )
        
        try:
            response = requests.post(
                self.api_url,
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=10
            )
            response.raise_for_status()

            data = response.json()

            if data.get("success") is False or data.get("data", [{}])[0].get("success") is False:
                error_msg = data.get("error") or data.get("data", [{}])[0].get("error", "Unknown error SMS")
                raise Exception(f"Error AlphaSMS: {error_msg}")

        except requests.exceptions.RequestException as e:
            raise Exception("Error while sending the message")

    def send_sms_code(self, phone_number: str, sms_id: int) -> None:
        try:
            validated_phone = self._check_phone_number(phone_number)
        except ValueError as e:
            raise ValueError(f"Not correct phone number {e}")

        code = self._generate_code()
        message = f"Ваш код підтвердження: {code}"

        self.cache.set("sms_code", str(sms_id), {"code": str(code)}, 3600)

        self.send_sms(phone_number=validated_phone, sms_id=sms_id, message=message)
    
    def send_confirmation_sms(self, phone_number: int, sms_id: int):
        try:
            validated_phone = self._check_phone_number(phone_number)
        except ValueError as e:
            raise ValueError(f"Not correct phone number {e}")

        order_number = self._generate_code(k=6)
        message = f"Ваше замовлення №{order_number} прийнято.\nОчікуйте повідомлення від Нової Пошти"

        # message = (
        #     f"Номер вашого замовлення {order_number}\n\n"
        #     f"Деталі замовлення:\n"
        #     f"Замовник: {surname.capitalize()} {name.capitalize()}\n"
        #     f"Адреса доставки:\n"
        #     f"Область: {region}\n"
        #     f"Місто: {city}\n"
        #     f"Відділення: {warehouse}\n"
        #     f"Замовлення:\n{order}\n\n"
        #     "Дякуємо Вам за замовлення. В межах 24 годин Ви отримаєте підтвердження від Нової Пошти з інформацією про дату доставки."
        # )

        self.send_sms(phone_number=validated_phone, sms_id=sms_id, message=message)


