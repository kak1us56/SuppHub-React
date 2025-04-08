import { useContext, useState, useEffect } from "react";
import { UiPopup } from "../../uikit/ui-popup";
import { StateContext, StatesType } from "../../uikit/state-context";
import { BasketItem } from "./basket-item";
import Link from "next/link";
import { productName1, productName2, productName3, productName4, productName5, productName6, productPrice1,
  productPrice2, productPrice3, productPrice4, productPrice5, productPrice6, productImg1, productImg2,
  productImg3, productImg4, productImg5, productImg6 } from "../../constants/constants";
import { controlBasketTotal, controlButtonActive } from "../../constants/functions-global-logic";

export function BasketPopup() {
  const [basketTotal, setBasketTotal] = useState<number>(0);
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const states: StatesType = useContext(StateContext);

  useEffect(() => controlBasketTotal(setBasketTotal), []);

  //   Button active
  useEffect(() => controlButtonActive(setButtonActive), [])

  return (
    <UiPopup
      width="w-[71.25rem]"
      heigth="min-h-[45.5rem]"
      header="Корзина"
      active={states.basketActive}
      setActive={states.setBasketActive}
    >
      <div>
        <div className="w-[63.75rem] h-[33.875rem] border-b-2 border-b-[#494949] border-solid overflow-y-auto overflow-x-hidden">
          <BasketItem
            img={productImg1}
            name={productName1}
            price={productPrice1}
            id='1'
          />
          <BasketItem
            img={productImg2}
            name={productName2}
            price={productPrice2}
            id='2'
          />
          <BasketItem
            img={productImg3}
            name={productName3}
            price={productPrice3}
            id='3'
          />
          <BasketItem
            img={productImg4}
            name={productName4}
            price={productPrice4}
            id='4'
          />
          <BasketItem
            img={productImg5}
            name={productName5}
            price={productPrice5}
            id='5'
          />
          <BasketItem
            img={productImg6}
            name={productName6}
            price={productPrice6}
            id='6'
          />
        </div>
        <div className="flex justify-between pt-[35px] px-[40px]">
          <Link href={`${buttonActive ? '/confirm' : '/'}`}>
            <div className={`${buttonActive ? 'bg-[#F90] cursor-pointer' : 'bg-[#cca365] cursor-default'}
              flex justify-center items-center w-[18.75rem] h-[3.25rem] rounded-[4px]`}>
              <p className="font-medium leading-cssnormal tracking-[1.6px] text-black text-[1.25rem]">
                Оформити замовлення
              </p>
            </div>
          </Link>
          <p className="font-medium text-white leading-cssnormal tracking-[2.56px] text-[2rem]">
            Сума: {basketTotal} ₴
          </p>
        </div>
      </div>
    </UiPopup>
  );
}
