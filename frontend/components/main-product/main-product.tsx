import Link from "next/link";
import Image from "next/image";
import { cardProps } from "../constants/interfaces"

import { Handjet } from "next/font/google";
import { ProductBasket } from "./product-basket";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

interface MainProductProps {
    product: cardProps;
}

export const MainProduct = ({ product }: MainProductProps) => {
    return (
        <div className="max-w-[1316px] max-md:max-w-[372px] mx-auto px-4">
            <Link href="/">
                <p className="text-white text-[28px] leading-cssnormal font-normal tracking-[2.24px] pt-[60px] max-md:text-[0.875rem] max-md:pt-[17px]">
                    ← На головну
                </p>
            </Link>
            <h1 className={`${handjet.className} text-[3rem] leading-cssnormal text-[#D9D9D9] tracking-[3.84px] font-medium pt-[66px] pb-[36px] max-md:text-[2rem] max-md:tracking-[2.56px] max-md:pt-[21px] max-md:pb-[8px]`}>
                {product.name}
            </h1>
            <div className="flex justify-between mb-[60px] max-md:mb-[17px] max-md:flex-col max-md:items-center max-md:gap-6">
                <div className="w-[23.5rem] h-[23.5rem] bg-[#494949] rounded-[25px] flex justify-center items-center max-md:w-[15.1875rem] max-md:h-[15.1875rem]">
                    <div className="w-[9.375rem] max-md:w-[6.0625rem]">
                        <Image src={product.img} alt={product.name} width={150} />
                    </div>
                </div>
                <ProductBasket 
                    active_ingredients={product.active_ingredients} 
                    amount={product.amount} id={product.id} 
                    pill_amount={product.pill_amount} 
                    pill_form={product.pill_form} price={product.price} 
                    producer_country={product.producer_country} 
                    />
            </div>
            <div className="pb-[60px] flex justify-between max-md:pb-[30px] max-md:flex-col max-md:gap-7 max-md:items-center">
                <div 
                    className="product-description-content px-[30px] pt-6 pb-9 w-[76%] text-[1.5rem]/[2.1875rem] text-white tracking-[1.68px] font-medium text-justify bg-[#343434] rounded-[18px] max-md:text-[0.875rem]/[1.25rem] max-md:tracking-[0.76px] max-md:px-4 max-md:pt-4 max-md:pb-5 max-md:w-full"
                    dangerouslySetInnerHTML={{ __html: product.description || '<p>Опис відсутній</p>' }}
                />
                {
                    product.certificate && 
                    <div className="w-[17.25rem] flex flex-col gap-3 items-center max-md:w-[10.625rem]">
                        <Image src={product.certificate} alt="Сертифікат на продукцію" className="rounded-[8px]" />
                        <div className="text-[1rem]/[1rem] max-md:text-[0.875rem] font-medium text-white text-center">
                            Сертифікат<br />на продукцію
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}