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
  sendCode: () => void;
}


export const PhoneConfirmation = ({ isPhoneConfirmationActive, sendData, sendCode }: PhoneConfirmationProps) => {
    const [buttonActive, setButtonActive] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const [time, setTime] = useState<number>(90);
    const [isSendAgain, setIsSendAgain] = useState<boolean>(false);

    const counterTime = () => {
        if (!isPhoneConfirmationActive) return;

        setTime(90);
        setIsSendAgain(false);

        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setIsSendAgain(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);        
    }
    useEffect(() => counterTime(), [isPhoneConfirmationActive]);
    
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
                <div className={`${isPhoneConfirmationActive ? "block" : "hidden"} relative flex flex-col items-center w-[37.5rem] min-h-[17.5rem] max-sm:w-[18rem] max-sm:min-h-[9rem] bg-[#343434] popup-transition`}>
                    <div className="flex justify-between items-center py-[10px] max-sm:min-h-[48px] px-[34px] w-full min-h-[68px] bg-black">
                        <p className={`leading-cssnormal tracking-[3.2px] text-[2.5rem] max-sm:text-[1.5rem] max-sm:tracking-[1.8px] text-[#D9D9D9] font-medium ${handjet.className}`}>Код підтвердження</p>
                    </div>
                    <div className="pt-5 max-sm:h-[178px]">
                        <form action="" className="flex flex-col gap-3 max-sm:items-center">
                            <input type="text" maxLength={4} inputMode="numeric" value={code} onChange={handleInputChange} className="text-[24px] text-center
                                w-[25rem] h-[3.2rem] max-sm:w-[15rem] max-sm:h-[2.5rem] max-sm:text-[1.25rem] rounded-[6px] bg-[#494949] outline-none border-0 tracking-[10px] text-white" />
                            <button
                                onClick={handleConfirmClick}
                                className={`${buttonActive ? "bg-[#F90] cursor-pointer" : "bg-[#d9d9d9] cursor-default"} flex justify-center items-center self-center w-[20.9375rem] h-[3.125rem]
                                rounded-[8px] outline-none border-0 transition-linear max-sm:w-[12rem] max-sm:h-[2.5rem] max-sm:mb-0`}>
                                <p className="text-black text-[22px] font-medium max-sm:text-[1.2rem]">Підтвердити</p>
                            </button>
                        </form>
                        <p 
                            onClick={() => {
                                if (isSendAgain) {
                                    sendCode();
                                    counterTime();
                                }
                            }}
                            className={`${isSendAgain ? "cursor-pointer" : "cursor-auto"} text-[#d9d9d9] text-[1rem] leading-cssnormal pt-[13px] text-center max-sm:text-[0.9rem] max-sm:mb-4`}>
                            Відправити знову<br />
                            <span className={`${isSendAgain ? "hidden" : "block"}`}>(доступно через {time} секунд)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}