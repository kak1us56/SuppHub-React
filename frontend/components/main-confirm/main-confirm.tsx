import { Handjet } from "next/font/google";
import { ConfirmForm } from "./confirm-form";
import { ConfirmTotal } from "./confirm-total";
import { PhoneConfirmation } from "./phone-confirmation";

import React, { useEffect, useRef, useState } from 'react';
import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";
import Select from "react-select/dist/declarations/src/Select";
import { SelectInstance } from "react-select";
import { OptionType } from "./form-place";
import { controlBasketTotal } from "../constants/functions-global-logic";
import { cardProps } from "../constants/interfaces";

const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function MainConfirm() {
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputVornameRef = useRef<HTMLInputElement>(null);
    const inputTelRef = useRef<HTMLInputElement>(null);
    const regionSelectRef = useRef<SelectInstance<OptionType>>(null);
    const citySelectRef = useRef<SelectInstance<OptionType>>(null);
    const warehouseSelectRef = useRef<SelectInstance<OptionType>>(null);
    const textareaCommentRef = useRef<HTMLTextAreaElement>(null);
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

    useEffect(() => {controlBasketTotal(setBasketTotal)}, [])

    const statesConfirm: StatesConfirmType = {
        inputNameRef,
        inputVornameRef,
        inputTelRef,
        regionSelectRef,
        citySelectRef,
        warehouseSelectRef,
        textareaCommentRef,
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


    const sendData = async () => {
        const inputNameValue = inputNameRef.current?.value || '';
        const inputVornameValue = inputVornameRef.current?.value || '';
        const inputTelValue = inputTelRef.current?.value || '';
        const regionSelectValue = regionSelectRef.current?.getValue()[0]?.label || '';
        const citySelectValue = citySelectRef.current?.getValue()[0]?.label || '';
        const warehouseSelectValue = warehouseSelectRef.current?.getValue()[0]?.label || '';
        const textareaCommentValue = textareaCommentRef.current?.value || '';
        const checkboxCallMeValue = checkboxCallMeRef.current?.checked
            ? 'Не дзвонити мені'
            : 'Передзвоніть мені';

        const fullSummMsg = basketTotal;

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
                return
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
                return
            } else if (!isValidPhoneNumber(inputTelValue)) {
                setIsRequiredCityActive(false);
                setIsRequiredRegionActive(false);
                setIsRequiredWarehouseActive(false);
                setIsRequiredNameActive(false);
                setIsRequiredVornameActive(false);
                setIsRequiredTelActive(false);

                setIsIncorrectTelActive(true);
                return
            }

            setIsPhoneConfirmationActive(true);

            const body = {
                inputNameValue,
                inputVornameValue,
                inputTelValue,
                regionSelectValue,
                citySelectValue,
                warehouseSelectValue,
                textareaCommentValue,
                checkboxCallMeValue,
                fullSummMsg,
                orderText: productText,
            };

            try {
                const response = await fetch("/api/submit/", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                const result = await response.text();
                console.log('Відповідь сервера:', result);

                inputNameRef.current.value = '';
                inputVornameRef.current.value = '';
                inputTelRef.current.value = '';
                regionSelectRef.current.clearValue();
                citySelectRef.current.clearValue();
                warehouseSelectRef.current.clearValue();
                textareaCommentRef.current.value = '';
                checkboxCallMeRef.current.checked = false;
            } catch (error) {
                console.error('Помилка:', error);
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };

    return (
        <div className="min-h-[1311px] bg-[#1F1F1F] mt-20 bg-repeat bg-pill bg-[length:250px]">
            <PhoneConfirmation isPhoneConfirmationActive={isPhoneConfirmationActive} />
            <div className="max-w-[1312px] max-md:max-w-[352px] mx-auto px-4">
                <div>
                    <h1 className={`${handjet.className}
                        text-[#D9D9D9] leading-cssnormal tracking-[5.12px] text-[4rem] py-[68px] font-medium`}>
                        Оформлення замовлення
                    </h1>
                </div>
                <div className="min-h-[1064px]">
                    <StateContextConfirm.Provider value={statesConfirm}>
                        <ConfirmForm />
                        <ConfirmTotal sendData={sendData} />                        
                    </StateContextConfirm.Provider>
                </div>
            </div>
        </div>
    )
}