import { useEffect, useState } from "react";
import { ConfirmTotalItem } from "./confirm-total-item";
import { Handjet } from "next/font/google";
import { controlBasketTotal } from "../constants/functions-global-logic";
import { cardProps } from "../constants/interfaces";

const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});

type ConfirmTotalProps = {
  sendCode: () => void;
  discount: number;
};

export function ConfirmTotal({ sendCode, discount }: ConfirmTotalProps) {
    const [totalSum, setTotalSum] = useState<number>(0);
    const [items, setItems] = useState<cardProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch("/api/products/");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
        };

        fetchData();
    }, [])

    useEffect(() => controlBasketTotal(setTotalSum), []);
    const finalPrice = discount > 0 
        ? totalSum - (totalSum * discount / 100) 
        : totalSum;

    return (
        <div className="sticky top-[100px] w-[37.5rem] min-h-[26.5rem] max-md:min-h-[8.75rem] px-10 pt-10 pb-7 max-md:m-0 max-md:p-0 max-md:w-full
            rounded-[25px] md:bg-[#5E5A53] flex flex-col mt-[73px] float-right max-md:float-none">
            <h2 className="text-[2rem] leading-cssnormal pl-[7px] pb-[34px] text-white font-semibold max-md:hidden">
                РАЗОМ
            </h2>
            <div className="flex flex-col gap-[22px] pb-[47px] max-md:hidden">
                {items.map((item) => (
                    <ConfirmTotalItem key={item.id} name={item.name} id={item.id} />
                ))}

                {/* <ConfirmTotalItem name={productName1} id="1" />
                <ConfirmTotalItem name={productName2} id="2" />
                <ConfirmTotalItem name={productName3} id="3" />
                <ConfirmTotalItem name={productName4} id="4" />
                <ConfirmTotalItem name={productName5} id="5" />
                <ConfirmTotalItem name={productName6} id="6" /> */}
            </div>
            <div className="w-[32.5rem] h-[1px] bg-[#343434] max-md:w-[17.5rem] max-md:bg-white max-md:mx-auto max-md:mt-6"></div>
            <div className="flex justify-between pt-4 pb-[30px] max-md:w-full">
                <div className="text-[1.5rem] leading-cssnormal tracking-[1.68px]">
                    <p className="pt-2 text-white font-medium max-md:text-[1rem]/[1.25rem] max-md:pt-1">
                        Сума:
                    </p>
                    <p className="pt-[34px] text-white font-medium max-md:text-[1rem]/[1.25rem] max-md:pt-3">
                        Вартість доставки:
                    </p>
                </div>
                <div className={`text-[2.25rem] leading-cssnormal tracking-[2.52px] flex flex-col gap-2`}>
                    <p className={`${handjet.className} text-white font-medium max-md:text-[1.25rem]/[1.25rem]`}>
                        <span>{finalPrice.toFixed(0)}</span> грн
                    </p>
                    <p className={`${handjet.className} text-white font-medium max-md:text-[1.25rem]/[1.25rem]`}>
                        За тарифами<br /> перевізника
                    </p>
                </div>
            </div>
            <button 
                onClick={sendCode}
                className="w-[15.375rem] h-[3.25rem] max-md:w-[10rem] max-md:h-[2rem] bg-[#F90] rounded-[4px] flex items-center justify-center cursor-pointer self-center outline-none border-none max-md:mb-8">
                <p className="leading-cssnormal text-black text-[1.25rem] tracking-[1.6px] max-md:text-[1rem] max-md:tracking-[1.28px] max-md:mx-auto">
                    Підтвердити
                </p>
            </button>
        </div>
    )
}