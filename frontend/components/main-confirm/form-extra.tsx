import { useContext, useState } from "react";
import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";

export function FormExtra() {
    const states: StatesConfirmType = useContext(StateContextConfirm);
    const [value, setValue] = useState<string>("");

    // Promocode input to uppercase
    const handleChange = (event) => {
        const inputValue = event.target.value;
        const upperCaseValue = inputValue.toUpperCase();
        setValue(upperCaseValue);
    }

    return (
        <div className="flex flex-col">
            <h2 className="leading-cssnormal text-white tracking-[2.24px] text-[2rem] font-semibold">
                3. Додаткові дані
            </h2>
            <div className="flex flex-col pt-[35px] gap-[10px]">
                <p className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white">
                    Коментарій
                </p>
                <textarea name="comment"
                    ref={states.textareaCommentRef}
                    className="w-[26.4375rem] h-[6.0625rem] rounded-[5px] bg-[#494949] pl-[11px] pt-2 text-[1.25rem]/[20px]
                        tracking-[1.4px] text-white outline-none resize-y">

                </textarea>
            </div>
            <div className="w-[26.4375rem] pt-8">
                <p className="text-white font-medium text-[1.25rem]/[20px] tracking-[1.4px] pl-[9px] pb-[10px]">Промокод:</p>
                <div className="flex justify-between">
                    <input 
                        type="text" 
                        id="promocodeInput"
                        ref={states.inputPromocodeRef}
                        value={value}
                        onChange={handleChange}
                        maxLength={8}
                        className="rounded-[5px] bg-[#494949] text-center text-[1.25rem]/[20px]
                        tracking-[1.4px] text-white outline-none w-[232px] h-[44px]" />
                    <button
                        className="w-[165px] h-[44px] bg-[#F90] rounded-[4px] flex items-center justify-center cursor-pointer self-center outline-none border-none">
                        <p className="leading-cssnormal text-black text-[1.25rem] tracking-[1.6px]">
                            Застосувати
                        </p>
                    </button>
                </div>

            </div>
            <div className="pt-[43px] pl-[23px]">
                <input type="checkbox" id="checkbox"
                    ref={states.checkboxCallMeRef}
                    className="hidden confirm__checkbox" />
                <label htmlFor="checkbox" className="confirm__label-callme text-white">
                    <span>
                        Не дзвонити для <br />
                        підтвердження замовлення
                    </span>
                </label>
            </div>
        </div>
    )
}