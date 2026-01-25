import { useEffect, useState } from "react";
import { cardCounterDe, cardCounterIn, controlCardCounter, handlePushCount } from "../main/catalog/card-logic";

interface ProductBasketProps {
    id: string;
    price: number;
    pill_amount: string;
    active_ingredients: string;
    producer_country: string;
    pill_form: string;
    amount: number;
    setIsAddToBasketActive: (active: boolean) => void;
}

export const ProductBasket: React.FC<ProductBasketProps> = ({ id, price, active_ingredients, pill_amount, pill_form, producer_country, amount, setIsAddToBasketActive }) => {
    const [cardCounter, setCardCounter] = useState<number>(1);
    const [isActive, setIsActive] = useState<boolean>(false);

    // Reset count
    useEffect(() => controlCardCounter(id, setCardCounter), []);

    // Is the product in stock
    useEffect(() => amount === 0 ? setIsActive(false) : setIsActive(true), []);
    
    return (
        <div className="w-[47.9375rem] max-md:w-full max-md:min-h-[11.625rem] min-h-full bg-[#343434] rounded-[18px] pt-[34px] pb-[6px] max-md:pt-3">
            <div className="flex justify-between items-center pb-[23px] px-[48px] max-md:px-3 max-md:pb-2">
                <div className="text-[1.5rem] font-semibold leading-cssnormal tracking-[1.68px] text-[#F90] max-md:text-[1rem] max-md:tracking-[1.12px]">
                    {price} ₴
                </div>
                <div className="text-[1.25rem] font-medium leading-cssnormal tracking-[1.4px] text-[#F90] max-md:text-[0.875rem] max-md:tracking-[0.91px]">
                    {pill_amount}
                </div>
            </div>
            <div className="w-[94%] h-[1px] bg-[#5E5A53] mx-auto mb-[21px] max-md:mb-[10px]"></div>
            <div className="text-[1.25rem]/[1.5rem] text-white tracking-[1.4px] font-medium mb-[41px] max-md:text-[0.775rem]/[1rem] max-md:mb-[20px] max-md:tracking-[0.84px]">
                <div className="py-[10px] bg-[#494949] px-[48px] flex max-md:px-3 max-md:py-[6px]">
                    <div className="w-[50%]">
                        Діючі речовини
                    </div>
                    <div className="w-[50%]">
                        {active_ingredients}
                    </div>
                </div>
                <div className="py-[5px] px-[48px] flex max-md:px-3 max-md:py-[6px]">
                    <div className="w-[50%]">
                        Країна виробник
                    </div>
                    <div className="w-[50%]">
                        {producer_country}
                    </div>
                </div>
                <div className="py-[5px] bg-[#494949] px-[48px] flex max-md:px-3 max-md:py-[6px]">
                    <div className="w-[50%]">
                        Форма випуску
                    </div>
                    <div className="w-[50%]">
                        {pill_form}
                    </div>
                </div>
            </div>
            <div className="w-[94%] h-[1px] bg-[#5E5A53] mx-auto"></div>
            <div className="flex items-center gap-[25px] justify-end px-[48px] pt-4 max-md:justify-between max-md:px-3 max-md:pt-2">
                <div className={`flex max-md:py-[7px] max-md:gap-[0.75rem] py-[14px] self-center gap-[14px] items-center`}>
                    <div
                        className={`${isActive ? "cursor-pointer" : "cursor-default"} user-select max-md:w-[25px] max-md:h-[25px] text-[1.5rem] flex justify-center items-center
                        w-[23px] h-[23px] bg-[#494949] rounded-full font-normal`}
                        onClick={() => cardCounterDe(cardCounter, setCardCounter)}
                    >
                        -
                    </div>
                    <div className="text-[#F90] max-md:text-[1.2rem]/[16px] max-md:tracking-[1px] text-[1.25rem]/[35px] tracking-[2.6px] font-medium">
                        {cardCounter}
                    </div>
                    <div
                        className={`${isActive ? "cursor-pointer" : "cursor-default"} user-select max-md:w-[25px] max-md:h-[25px] text-[1.5rem] flex justify-center items-center
                        w-[23px] h-[23px] bg-[#494949] rounded-full font-normal`}
                        onClick={() => cardCounterIn(cardCounter, setCardCounter, amount)}
                    >
                        +
                    </div>
                </div>
                <div
                    onClick={() => isActive && handlePushCount(id, cardCounter, setIsAddToBasketActive)}
                    className={`${isActive ? "w-[9.8125rem] bg-[#F90] cursor-pointer" : "w-[15.8125rem] bg-[#8c8c8c] cursor-default"}
                    flex max-md:w-[8.5rem] max-md:h-[2.25rem] max-md:rounded-[16px] justify-center items-center
                    self-center h-[3.125rem] rounded-[40px]`}
                >
                    <p className="max-md:text-[0.875rem]/[16px] max-md:tracking-[1px] text-[1.25rem]/[35px] tracking-[2.6px] text-white font-medium text-center">
                    {isActive ? "В корзину" : "Нема в наявності"}
                    </p>
                </div>
            </div>
        </div>
    )
}