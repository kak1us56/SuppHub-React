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
        <div className="sticky top-[100px] w-[37.5rem] min-h-[26.5rem] px-10 pt-10 pb-7
            rounded-[25px] bg-[#5E5A53] flex flex-col mt-[73px] float-right">
            <h2 className="text-[2rem] leading-cssnormal pl-[7px] pb-[34px] text-white font-semibold">
                РАЗОМ
            </h2>
            <div className="flex flex-col gap-[22px] pb-[47px] ">
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
            <div className="w-[32.5rem] h-[1px] bg-[#343434]"></div>
            <div className="flex justify-between pt-4 pb-[30px]">
                <div className="text-[1.5rem] leading-cssnormal tracking-[1.68px]">
                    <p className="pt-2 text-white font-medium">
                        Сума:
                    </p>
                    <p className="pt-[34px] text-white font-medium">
                        Вартість доставки:
                    </p>
                </div>
                <div className={`text-[2.25rem] leading-cssnormal tracking-[2.52px] flex flex-col gap-2`}>
                    <p className={`${handjet.className} text-white font-medium`}>
                        <span>{finalPrice.toFixed(0)}</span> грн
                    </p>
                    <p className={`${handjet.className} text-white font-medium`}>
                        За тарифами<br /> перевізника
                    </p>
                </div>
            </div>
            <button 
                onClick={sendCode}
                className="w-[15.375rem] h-[3.25rem] bg-[#F90] rounded-[4px] flex items-center justify-center cursor-pointer self-center outline-none border-none">
                <p className="leading-cssnormal text-black text-[1.25rem] tracking-[1.6px]">
                    Підтвердити
                </p>
            </button>
        </div>
    )
}