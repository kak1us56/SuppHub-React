import { Handjet } from "next/font/google";
import { useState, useRef, useEffect } from "react";

import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";
import { SelectInstance } from "react-select";
import { OptionType } from "./form-place";
import { cardProps } from "../constants/interfaces";

const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});


interface PhoneConfirmationProps {
  isPhoneConfirmationActive: boolean;
  sendData: (code: string) => void;
}


export const PhoneConfirmation = ({ isPhoneConfirmationActive, sendData }: PhoneConfirmationProps) => {
    const [buttonActive, setButtonActive] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        const numericValue = inputValue.replace(/\D/g, '');
        setCode(numericValue);

        if (numericValue.length === 4) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }

    const handleConfirmClick = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (code.length === 4) {
            sendData(code);
        }
    }

    return (
        <div className={`${isPhoneConfirmationActive ? "block" : "hidden"} fixed w-full h-full bg-[rgba(0,_0,_0,_0.8)] top-0 left-0 z-10 popup-transition`}>
            <div className="min-h-full flex justify-center items-center py-[30px] px-[10px] popup-transition">
                <div className={`${isPhoneConfirmationActive ? "block" : "hidden"} relative flex flex-col items-center w-[37.5rem] min-h-[17.5rem] bg-[#343434] popup-transition`}>
                    <div className="flex justify-between items-center py-[10px] px-[34px] w-full min-h-[68px] bg-black">
                        <p className={`leading-cssnormal tracking-[3.2px] text-[2.5rem] text-[#D9D9D9] font-medium ${handjet.className}`}>Код підтвердження</p>
                    </div>
                    <div className="pt-5">
                        <form action="" className="flex flex-col gap-3">
                            <input type="text" maxLength={4} inputMode="numeric" value={code} onChange={handleInputChange} className="text-[24px] text-center
                                w-[25rem] h-[3.2rem] rounded-[6px] bg-[#494949] outline-none border-0 tracking-[10px] text-white" />
                            <button
                                onClick={handleConfirmClick}
                                className={`${buttonActive ? "bg-[#F90] cursor-pointer" : "bg-[#d9d9d9] cursor-default"} flex justify-center items-center self-center w-[20.9375rem] h-[3.125rem]
                                rounded-[8px] outline-none border-0 transition-linear`}>
                                <p className="text-black text-[22px] font-medium">Підтвердити</p>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}