import { useContext, useState } from "react";
import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";

type FormExtraProps = {
    apply_promo: (event: any) => Promise<void>;
}

export const FormExtra = ({ apply_promo }: FormExtraProps) => {
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
            <h2 className="leading-cssnormal text-white tracking-[2.24px] text-[2rem] font-semibold max-md:text-[16px] max-md:tracking-[1.12px]">
                3. Додаткові дані
            </h2>
            <div className="flex flex-col pt-[35px] gap-[10px] max-md:pt-1 max-md:pl-[18px]">
                <p className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white max-md:pl-0 max-md:text-[14px] max-md:tracking-[0.98px]">
                    Коментарій
                </p>
                <textarea name="comment"
                    ref={states.textareaCommentRef}
                    className="w-[26.4375rem] h-[6.0625rem] rounded-[5px] bg-[#494949] pl-[11px] pt-2 text-[1.25rem]/[20px]
                        tracking-[1.4px] text-white outline-none resize-y max-md:w-[17.375rem] max-md:h-[5rem] max-md:text-[16px]/[14px] max-md:tracking-[1.15px]">

                </textarea>
            </div>
            <div className="w-[26.4375rem] pt-8 max-md:w-[18.5rem] max-md:pl-[18px] max-md:pt-3">
                <p className="text-white font-medium text-[1.25rem]/[20px] tracking-[1.4px] pl-[9px] pb-[10px] max-md:pl-0 max-md:pb-1 max-md:text-[14px] max-md:tracking-[0.98px]">Промокод:</p>
                <div className="flex justify-between">
                    <input 
                        type="text" 
                        id="promocodeInput"
                        ref={states.inputPromocodeRef}
                        value={value}
                        onChange={handleChange}
                        maxLength={8}
                        className="rounded-[5px] bg-[#494949] text-center text-[1.25rem]/[20px] max-md:w-[10.125rem] max-md:h-[2rem]
                        tracking-[1.4px] text-white outline-none w-[232px] h-[44px] max-md:tracking-[1.15px] max-md:text-[16px]/[14px]" />
                    <button
                        onClick={apply_promo}
                        type="submit"
                        className="w-[165px] h-[44px] max-md:w-[6.75rem] max-md:h-[2rem] bg-[#F90] rounded-[5px] flex items-center justify-center cursor-pointer self-center outline-none border-none">
                        <p className="leading-cssnormal text-black text-[1.25rem] max-md:text-[0.875rem] max-md:tracking-[0.98px] tracking-[1.6px]">
                            Застосувати
                        </p>
                    </button>
                </div>

            </div>
            <div className="pt-[43px] pl-[23px] max-md:pt-6">
                <input type="checkbox" id="checkbox"
                    ref={states.checkboxCallMeRef}
                    className="hidden confirm__checkbox" />
                <label htmlFor="checkbox" className="confirm__label-callme text-white max-md:text-[0.875rem]/[20px] max-md:tracking-[0.98px] max-md:w-full">
                    <span>
                        Не дзвонити для <br />
                        підтвердження замовлення
                    </span>
                </label>
            </div>
        </div>
    )
}