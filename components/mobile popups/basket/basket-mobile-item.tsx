import Image from "next/image";
import { useEffect, useState } from "react";
import { cardProps } from "../../constants/interfaces";
import { controlMobileBasketItems } from "./basket-mobile-logic";
import { handleDeleteItem } from "../../constants/functions-global-logic";

export const BasketMobileItem: React.FC<cardProps> = ({ img, name, price, id }) => {
  const [productAmount, setProductAmount] = useState<number>(0);
  const [itemActive, setItemActive] = useState<boolean>(false);

  // Item display
  useEffect(() => controlMobileBasketItems(id, setItemActive, setProductAmount), []);

  return (
    <div
      className={`${itemActive ? "flex" : "hidden"} flex-col justify-start items-start gap-3 w-[9.75rem] h-[11.25rem] border-2 border-[#494949] border-t-0`}
    >
      <div className="flex flex-col w-[9.375rem] gap-2 items-center pt-3">
        <div>
          <Image src={img} alt="Продукт" className="w-[42px]" />
        </div>
        <div className="flex self-start flex-col gap-[5px] pl-2">
          <p className="tracking-[2px] text-[1rem] leading-cssnormal text-white font-medium">
            {name}
          </p>
          <p className="text-[0.875rem] tracking-[1.4px] leading-cssnormal text-white font-medium">
            {price} ₴
            <span className="text-orange-400">
              &nbsp;&nbsp;&nbsp;x
              <span>{productAmount}</span>
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center pl-2">
        <p onClick={() => handleDeleteItem(id, setItemActive)} className="text-[#D9D9D9] cursor-pointer leading-cssnormal font-medium text-[0.775rem] tracking-[1px] underline">
          Видалити
        </p>
      </div>
    </div>
  );
}
