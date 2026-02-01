import { Handjet } from "next/font/google";
import { ConfirmForm } from "./confirm-form";
import { ConfirmTotal } from "./confirm-total";
import { PhoneConfirmation } from "./phone-confirmation";
import { useRouter } from 'next/router';

import React, { useEffect, useRef, useState } from 'react';
import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";
import Select from "react-select/dist/declarations/src/Select";
import { SelectInstance } from "react-select";
import { OptionType } from "./form-place";
import { controlBasketTotal, mobileResize } from "../constants/functions-global-logic";
import { cardProps } from "../constants/interfaces";
import { ProductsMobile } from "./products-mobile";
import Link from "next/link";

const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function MainConfirm() {
    const [smsId, setSmsId] = useState<number | null>(null)
    const [discount, setDiscount] = useState<number>(0)
    const router = useRouter();

    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputVornameRef = useRef<HTMLInputElement>(null);
    const inputTelRef = useRef<HTMLInputElement>(null);
    const regionSelectRef = useRef<SelectInstance<OptionType>>(null);
    const citySelectRef = useRef<SelectInstance<OptionType>>(null);
    const warehouseSelectRef = useRef<SelectInstance<OptionType>>(null);
    const textareaCommentRef = useRef<HTMLTextAreaElement>(null);
    const inputPromocodeRef = useRef<HTMLInputElement>(null);
    const checkboxCallMeRef = useRef<HTMLInputElement>(null);

    const [isRequiredNameActive, setIsRequiredNameActive] = useState<boolean>(false);
    const [isRequiredVornameActive, setIsRequiredVornameActive] = useState<boolean>(false);
    const [isRequiredTelActive, setIsRequiredTelActive] = useState<boolean>(false);
    const [isIncorrectTelActive, setIsIncorrectTelActive] = useState<boolean>(false);
    const [isRequiredRegionActive, setIsRequiredRegionActive] = useState<boolean>(false);
    const [isRequiredCityActive, setIsRequiredCityActive] = useState<boolean>(false);
    const [isRequiredWarehouseActive, setIsRequiredWarehouseActive] = useState<boolean>(false);
    const [basketTotal, setBasketTotal] = useState<number>(0)
    const [isPhoneConfirmationActive, setIsPhoneConfirmationActive] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const statesConfirm: StatesConfirmType = {
        inputNameRef,
        inputVornameRef,
        inputTelRef,
        regionSelectRef,
        citySelectRef,
        warehouseSelectRef,
        textareaCommentRef,
        inputPromocodeRef,
        checkboxCallMeRef,

        // Validation states
        isRequiredNameActive,
        isRequiredVornameActive,
        isRequiredTelActive,
        isIncorrectTelActive,
        isRequiredRegionActive,
        isRequiredCityActive,
        isRequiredWarehouseActive,
    };

    //   Mobile
    useEffect(() => mobileResize(setIsMobile), []);

    // Calculate sum price
    useEffect(() => {controlBasketTotal(setBasketTotal)}, [])

    const apply_promocode = async (event, setResponse) => {
        event.preventDefault();
        const inputPromocodeValue = inputPromocodeRef.current?.value || '';

        const body = {
            "code": inputPromocodeValue
        }

        try {
            const response = await fetch("/api/promocodes/check-promocode/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            });

            const result = await response.json()
            setResponse(result);

            if (response.ok && result.success) {
                setDiscount(result.discount);
            }
            
            
        } catch (error) {
            console.log("Помилка при застосуванні промокоду: ", error);
        }
    }


    // Send confirmation code
    const sendCode = async () => {
        const inputNameValue = inputNameRef.current?.value || '';
        const inputVornameValue = inputVornameRef.current?.value || '';
        const inputTelValue = inputTelRef.current?.value || '';
        const regionSelectValue = regionSelectRef.current?.getValue()[0]?.label || '';
        const citySelectValue = citySelectRef.current?.getValue()[0]?.label || '';
        const warehouseSelectValue = warehouseSelectRef.current?.getValue()[0]?.label || '';

        function isValidPhoneNumber(phone) {
            const regex = /^(\+380\d{9}|0\d{9})$/;
            return regex.test(phone);

                // const digitsOnly = phone.replace(/\D/g, '');
                // return digitsOnly.length >= 9;
        }

        try {
            const res = await fetch("/api/products/");
            const data = await res.json();

            let productText = '';

            data.forEach((item: cardProps) => {
                if (Number(localStorage.getItem(`itemAmount${item.id}`)) !== 0) {
                    productText += `${item.name} ${localStorage.getItem(`itemAmount${item.id}`)} шт. \n`
                }
            })

            setIsRequiredCityActive(false);
            setIsRequiredRegionActive(false);
            setIsRequiredWarehouseActive(false);
            setIsRequiredNameActive(false);
            setIsRequiredVornameActive(false);
            setIsRequiredTelActive(false);
            setIsIncorrectTelActive(false);

            if (productText === '') {
                alert("Ви не обрали жодного товару для замовлення");
                return;
            } else if (inputNameValue === '' || inputVornameValue === '' || regionSelectValue === '' || citySelectValue === '' || warehouseSelectValue === '') {
                switch ("") {
                    case inputNameValue:
                        setIsRequiredNameActive(true);
                    case inputVornameValue:
                        setIsRequiredVornameActive(true);
                    case inputTelValue:
                        setIsRequiredTelActive(true);
                    case regionSelectValue:
                        setIsRequiredRegionActive(true);
                    case citySelectValue:
                        setIsRequiredCityActive(true);
                    case warehouseSelectValue:
                        setIsRequiredWarehouseActive(true);
                }
                return;
            } else if (!isValidPhoneNumber(inputTelValue)) {
                setIsRequiredCityActive(false);
                setIsRequiredRegionActive(false);
                setIsRequiredWarehouseActive(false);
                setIsRequiredNameActive(false);
                setIsRequiredVornameActive(false);
                setIsRequiredTelActive(false);

                setIsIncorrectTelActive(true);
                return;
            }

            const body = {
                "phone_number": inputTelValue
            }

            try {
                const response = await fetch("/api/sms/send-sms-code/", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                const result = await response.json();
                
                if (response.ok) {
                    setIsPhoneConfirmationActive(true);
                    setSmsId(result.sms_id);
                    console.log('Відповідь сервера:', result);
                } else {
                    console.error('Ошибка от сервера:', result.error || result);
                }
            } catch (error) {
                console.error('Помилка:', error);
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    }

    // Send data per telegram
    const sendData = async (code: string) => {
        const inputNameValue = inputNameRef.current?.value || '';
        const inputVornameValue = inputVornameRef.current?.value || '';
        const inputTelValue = inputTelRef.current?.value || '';
        const regionSelectValue = regionSelectRef.current?.getValue()[0]?.label || '';
        const citySelectValue = citySelectRef.current?.getValue()[0]?.label || '';
        const warehouseSelectValue = warehouseSelectRef.current?.getValue()[0]?.label || '';
        const textareaCommentValue = textareaCommentRef.current?.value || '';
        const inputPromocodeValue = inputPromocodeRef.current?.value || "";
        const checkboxCallMeValue = checkboxCallMeRef.current?.checked
            ? 'Не дзвонити мені'
            : 'Передзвоніть мені';
        
        setIsPhoneConfirmationActive(false);
        
        try {
            const res = await fetch("/api/products/");
            const data = await res.json();

            let productText = '';
            let fullSummPrice = 0;
            let order_items: any[] = [];
            
            data.forEach((product: cardProps) => {
                fullSummPrice += Number(localStorage.getItem(`itemAmount${product.id}`)) * product.price
            });
            fullSummPrice = discount > 0 ? fullSummPrice - (fullSummPrice * discount / 100) : fullSummPrice;

            data.forEach((item: cardProps) => {
                const product_amount = Number(localStorage.getItem(`itemAmount${item.id}`));

                if (product_amount !== 0) {
                    productText += `${item.name} ${product_amount} шт. \n`;
                    
                    order_items.push({
                        product_id: item.id,
                        quantity: product_amount,
                    })
                }
            })

            const body = {
                "code": code,
                "sms_id": smsId,
                "data": {
                    "inputNameValue": inputNameValue,
                    "inputVornameValue": inputVornameValue,
                    "inputTelValue": inputTelValue,
                    "regionSelectValue": regionSelectValue,
                    "citySelectValue": citySelectValue,
                    "warehouseSelectValue": warehouseSelectValue,
                    "textareaCommentValue": textareaCommentValue,
                    "inputPromocodeValue": inputPromocodeValue,
                    "checkboxCallMeValue": checkboxCallMeValue,
                    "fullSummMsg": fullSummPrice.toFixed(0),
                    "orderText": productText,
                    "order": order_items,
                }
            };

            try {
                const response = await fetch("/api/submit/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                const result = await response.json();

                if (response.ok) {
                    inputNameRef.current.value = '';
                    inputVornameRef.current.value = '';
                    inputTelRef.current.value = '';
                    regionSelectRef.current.clearValue();
                    citySelectRef.current.clearValue();
                    warehouseSelectRef.current.clearValue();
                    textareaCommentRef.current.value = '';
                    checkboxCallMeRef.current.checked = false;

                    data.forEach((product: cardProps) => {
                        localStorage.setItem(`itemAmount${product.id}`, "");
                    });
                    localStorage.setItem("itemAmountSumm", "");

                    router.push('/confirmed');
                } else {
                    router.push('/confirm');
                }

            } catch (error) {
                console.error('Uknown error');
            }  

        } catch (error) {
            console.error("Error while loading data");
        }
    };

    return (
        <main>
            <div className="min-h-[1311px] max-md:min-h-[700px] bg-[#1F1F1F] mt-20 max-md:mt-[48px] bg-repeat bg-pill bg-[length:250px] max-md:bg-[length:130px]">
                <PhoneConfirmation isPhoneConfirmationActive={isPhoneConfirmationActive} sendData={sendData} sendCode={sendCode} />     
                <div className="max-w-[1312px] max-md:max-w-[352px] mx-auto px-4">
                    <Link href="/">
                        <p className="text-white text-[28px] leading-cssnormal font-normal tracking-[2.24px] pt-[60px] max-md:text-[0.875rem] max-md:pt-[17px]">
                            ← На головну
                        </p>
                    </Link>
                    <div>
                        <h1 className={`${handjet.className} max-md:text-[24px] max-md:tracking-[1.92px] max-md:pt-4 max-md:pb-8
                            text-[#D9D9D9] leading-cssnormal tracking-[5.12px] text-[4rem] py-[68px] font-medium`}>
                            Оформлення замовлення
                        </h1>
                    </div>
                    <div className="min-h-[1064px] max-md:min-h-[600px] flex justify-between items-start flex-wrap pb-8">
                        <StateContextConfirm.Provider value={statesConfirm}>
                            {isMobile && <ProductsMobile />}
                            <ConfirmForm apply_promo={apply_promocode} />
                            <ConfirmTotal sendCode={sendCode} discount={discount} />
                        </StateContextConfirm.Provider>
                    </div>
                </div>
            </div>            
        </main>

    )
}