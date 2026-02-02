import { useContext, useEffect, useState } from "react";
import { StateContextConfirm, StatesConfirmType } from "../uikit/state-context";

type FormExtraProps = {
    apply_promo: (event: any, setResponse: (res: any) => void) => Promise<void>;
}

export const FormExtra = ({ apply_promo }: FormExtraProps) => {
    const states: StatesConfirmType = useContext(StateContextConfirm);
    const [value, setValue] = useState<string>("");
    const [promoRes, setPromoRes] = useState<any>(null);
    const [promoErr, setPromoErr] = useState(false);
    const [promoResText, setPromoResText] = useState("");

    useEffect(() => {
        if (!promoRes) return;

        if (promoRes.success) {
            setPromoErr(false);
            setPromoResText(promoRes.success);
        } else if (promoRes.error) {
            setPromoErr(true);
            setPromoResText(promoRes.error);
        }
    }, [promoRes])

    // Promocode input to uppercase
    const handleChange = (event) => {
        const inputValue = event.target.value;
        const upperCaseValue = inputValue.toUpperCase();
        setValue(upperCaseValue);
    }

    return (
        <div className="flex flex-col">
            <h2 className="leading-cssnormal text-white tracking-[2.24px] text-[2rem] font-semibold max-sm:text-[16px] max-sm:tracking-[1.12px]">
                3. Додаткові дані
            </h2>
            <div className="flex flex-col pt-[35px] gap-[10px] max-sm:pt-1 max-sm:pl-[18px]">
                <label className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white max-sm:pl-0 max-sm:text-[14px] max-sm:tracking-[0.98px]">
                    Коментарій
                </label>
                <textarea name="comment"
                    ref={states.textareaCommentRef}
                    className="w-[26.4375rem] h-[6.0625rem] rounded-[5px] bg-[#494949] pl-[11px] pt-2 text-[1.25rem]/[20px]
                        tracking-[1.4px] text-white outline-none resize-y max-sm:w-[17.375rem] max-sm:h-[5rem] max-sm:text-[16px]/[14px] max-sm:tracking-[1.15px]">

                </textarea>
            </div>
            <div className="w-[26.4375rem] pt-8 max-sm:w-[18.5rem] max-sm:pl-[18px] max-sm:pt-3">
                <label className="text-white font-medium text-[1.25rem]/[20px] tracking-[1.4px] pl-[9px] pb-[10px] max-sm:pl-0 max-sm:pb-1 max-sm:text-[14px] max-sm:tracking-[0.98px]">Промокод:</label>
                <div className="flex justify-between">
                    <input 
                        type="text" 
                        id="promocodeInput"
                        ref={states.inputPromocodeRef}
                        value={value}
                        onChange={handleChange}
                        maxLength={8}
                        className="rounded-[5px] bg-[#494949] text-center text-[1.25rem]/[20px] max-sm:w-[10.125rem] max-sm:h-[2rem]
                        tracking-[1.4px] text-white outline-none w-[232px] h-[44px] max-sm:tracking-[1.15px] max-sm:text-[16px]/[14px]" />
                    <button
                        onClick={(e) => apply_promo(e, setPromoRes)}
                        type="submit"
                        className="w-[165px] h-[44px] max-sm:w-[6.75rem] max-sm:h-[2rem] bg-[#F90] rounded-[5px] flex items-center justify-center cursor-pointer self-center border-none">
                        <p className="leading-cssnormal text-black text-[1.25rem] max-sm:text-[0.875rem] max-sm:tracking-[0.98px] tracking-[1.6px]">
                            Застосувати
                        </p>
                    </button>
                </div>
                <div className={`${promoResText !== "" ? "block" : "hidden"} ${promoErr ? "text-red-500" : "text-green-500"} text-[0.775rem] pl-2`}>
                    {promoResText}
                </div>
            </div>
            <div className="pt-[43px] pl-[23px] max-sm:pt-6">
                <input type="checkbox" id="checkbox"
                    ref={states.checkboxCallMeRef}
                    className="hidden confirm__checkbox" />
                <label htmlFor="checkbox" className="confirm__label-callme text-white max-sm:text-[0.875rem]/[20px] max-sm:tracking-[0.98px] max-sm:w-full">
                    <span>
                        Не дзвонити для <br />
                        підтвердження замовлення
                    </span>
                </label>
            </div>
        </div>
    )
}