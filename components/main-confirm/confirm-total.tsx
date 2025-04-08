import { useEffect, useState } from "react";
import { ConfirmTotalItem } from "./confirm-total-item";
import { Handjet } from "next/font/google";
import { productName1, productName2, productName3, productName4, productName5, productName6, productPrice1,
    productPrice2, productPrice3, productPrice4, productPrice5, productPrice6, productImg1, productImg2,
    productImg3, productImg4, productImg5, productImg6 } from "../constants/constants";
import { controlBasketTotal } from "../constants/functions-global-logic";

const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function ConfirmTotal() {
    const [totalSum, setTotalSum] = useState<number>(0);

    useEffect(() => controlBasketTotal(setTotalSum), []);

    return (
        <div className="sticky top-[100px] w-[37.5rem] min-h-[26.5rem] px-10 pt-10 pb-7
            rounded-[25px] bg-[#5E5A53] flex flex-col mt-[73px] float-right">
            <h2 className="text-[2rem] leading-cssnormal pl-[7px] pb-[34px] text-white font-semibold">
                РАЗОМ
            </h2>
            <div className="flex flex-col gap-[22px] pb-[47px] ">
                <ConfirmTotalItem name={productName1} id="1" />
                <ConfirmTotalItem name={productName2} id="2" />
                <ConfirmTotalItem name={productName3} id="3" />
                <ConfirmTotalItem name={productName4} id="4" />
                <ConfirmTotalItem name={productName5} id="5" />
                <ConfirmTotalItem name={productName6} id="6" />
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
                <div className={`${handjet.className} text-[2.25rem] leading-cssnormal tracking-[2.52px] flex flex-col gap-2`}>
                    <p className="text-white font-medium">
                        <span>{totalSum}</span> грн
                    </p>
                    <p className="text-white font-medium">
                        За тарифами<br /> перевізника
                    </p>
                </div>
            </div>
        </div>
    )
}