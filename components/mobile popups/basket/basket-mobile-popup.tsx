import { useContext, useState, useEffect, use } from "react";
import { StateContext, StatesType } from "../../uikit/state-context";
import { productName1, productName2, productName3, productName4, productName5, productName6, productPrice1,
  productPrice2, productPrice3, productPrice4, productPrice5, productPrice6, productImg1, productImg2,
  productImg3, productImg4, productImg5, productImg6 } from "../../constants/constants";

import { Handjet } from "next/font/google";
import { BasketMobileItem } from "./basket-mobile-item";
import { controlBasketTotal, controlButtonActive, mobileResize } from "../../constants/functions-global-logic";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function BasketMobilePopup() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [basketTotal, setBasketTotal] = useState<number>(0);
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const states: StatesType = useContext(StateContext);

//   Mobile
  useEffect(() => mobileResize(setIsMobile), []);

//   Basket sum
  useEffect(() => controlBasketTotal(setBasketTotal), []);

//   Button active
  useEffect(() => controlButtonActive(setButtonActive), [])

  return (
    <div
      className={`fixed w-[100%] min-h-[100vh] bg-[#343434] py-[62px] px-8 z-[8] popup-transition
            ${states.basketActive ? "translate-none" : "-translate-y-full"}
            ${isMobile ? "block" : "hidden"}`}
    >
      <div className="flex flex-col items-center">
        <div>
          <h1
            className={`${handjet.className} pt-6 pb-2 text-[#D9D9D9] text-[2rem] tracking-[1.5px] font-medium`}
          >
            Корзина
          </h1>
          <div className="w-[19.5rem] h-[24.25rem] mt-6 border-b-2 border-b-[#494949] flex flex-wrap overflow-y-auto overflow-x-hidden">
            <BasketMobileItem
              img={productImg1}
              name={productName1}
              price={productPrice1}
              id='1'
            />
            <BasketMobileItem
              img={productImg2}
              name={productName2}
              price={productPrice2}
              id='2'
            />
            <BasketMobileItem
              img={productImg3}
              name={productName3}
              price={productPrice3}
              id='3'
            />
            <BasketMobileItem
              img={productImg4}
              name={productName4}
              price={productPrice4}
              id='4'
            />
            <BasketMobileItem
              img={productImg5}
              name={productName5}
              price={productPrice5}
              id='5'
            />
            <BasketMobileItem
              img={productImg6}
              name={productName6}
              price={productPrice6}
              id='6'
            />
          </div>
          <div className="flex justify-between pt-10">
            <div
              className={`${buttonActive ? 'bg-[#F90] cursor-pointer' : 'bg-[#cca365] cursor-default'}
                rounded-[4px] text-center w-[8.75rem] h-[2.85rem] mt-2 flex justify-center items-center transition-15`}
            >
              <p className="text-black text-[0.975rem] tracking-[1.3px] leading-cssnormal font-medium">
                Оформити замовлення
              </p>
            </div>
            <p className="tracking-[2.4px] text-[1.5rem] leading-cssnormal text-white font-medium">
              Сума:
              <br />
              <span>{basketTotal} </span>₴
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
