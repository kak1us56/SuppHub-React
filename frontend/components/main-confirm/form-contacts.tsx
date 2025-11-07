import { useContext, useRef, useState } from "react"
import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";

export function FormContacts() {
    const states: StatesConfirmType = useContext(StateContextConfirm);

    // Set default value for phone input
    const valueTel = () => {
        if (states.inputTelRef.current?.value === "") {
            states.inputTelRef.current.value = "+380";
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="leading-cssnormal text-white tracking-[2.24px] text-[2rem] font-semibold">
                1. Контактні дані
            </h2>
            <div className="flex flex-col gap-[18px] pt-8">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="inputName"
                            className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white pb-[10px]">
                            Ім’я*
                        </label>
                        <input type="text"
                            ref={states.inputNameRef}
                            id="inputName" 
                            className="w-[12.5rem] h-[2.75rem] rounded-[5px] bg-[#494949] pl-[11px] text-white
                                text-[1.25rem]/[20px] tracking-[1.4px] border-0 outline-none font-medium" />
                        <p className={`${states.isRequiredNameActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Це поле обов'язкове*</p>
                    </div>
                    <div className="flex flex-col w-[17.1875rem]">
                        <label htmlFor="inputVorname"
                            className="text-[1.25rem]/[20px] pl-[9px] pb-[10px] tracking-[1.4px] font-medium text-white">
                            Прізвище*
                        </label>
                        <input type="text"
                            ref={states.inputVornameRef}
                            id="inputVorname" 
                            className="w-[17.1875rem] h-[2.75rem] rounded-[5px] bg-[#494949] pl-[11px] text-white
                                text-[1.25rem]/[20px] tracking-[1.4px] border-0 outline-none font-medium" />
                        <p className={`${states.isRequiredVornameActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Це поле обов'язкове*</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="inputTel"
                        className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white pb-[10px]">
                        Номер телефону*
                    </label>
                    <input type="tel"
                        ref={states.inputTelRef}
                        id="inputTel" 
                        placeholder="+380672675492"
                        onFocus={() => valueTel()}
                        className="w-[31.125rem] h-[2.75rem] rounded-[5px] bg-[#494949] pl-[11px] text-white
                            text-[1.25rem]/[20px] tracking-[1.4px] border-0 outline-none font-medium" />
                    <p className={`${states.isRequiredTelActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Це поле обов'язкове*</p>
                    <p className={`${states.isIncorrectTelActive ? "block" : "hidden"} text-red-500 text-[0.775rem] pl-2`}>Некоректно введений номер телефону</p>
                </div>
            </div>
        </div>
    )
}