import Image from "next/image";
import { useState, useEffect, useRef, ReactNode } from "react";
import { cardProps } from "../../constants/interfaces";
import { controlBasketItems, handleSelectChange } from "./basket-logic";
import { handleDeleteItem } from "../../constants/functions-global-logic";

const optionsArr: ReactNode[] | null[] = new Array(10).fill(null);

export const BasketItem: React.FC<cardProps> = ({ img, name, price, id }) => {
  const [itemActive, setItemActive] = useState<boolean>(false);
  const itemSelect = useRef<HTMLSelectElement | null>(null);

  // Item display
  useEffect(() => controlBasketItems(id, setItemActive, itemSelect), []);

  return (
    <div
      className={`${itemActive ? "flex" : "hidden"}
      justify-between items-center w-[63.75rem] h-[11.25rem] border-b-2 border-b-[#494949] border-solid`}
    >
      <div className="flex gap-[38px] items-end pl-[42px]">
        <div>
          <Image src={img} alt="Продукт" width={53} />
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="font-medium text-white leading-cssnormal tracking-[2.56px] text-[2rem]">
            {name}
          </p>
          <p className="font-medium text-white leading-cssnormal tracking-[1.92px] text-[1.5rem]">
            {price} ₴
          </p>
        </div>
      </div>
      <div className="flex gap-[43px] items-center pr-[25px]">
        <select
          onClick={() => handleSelectChange(id, itemSelect)}
          ref={itemSelect}
          className="w-[4.5rem] h-[2.5rem] rounded-[4px] pl-3 cursor-pointer"
        >
          {optionsArr.map((_, i) => (
            <option value={++i} key={i}>
              {i}
            </option>
          ))}
        </select>
        <p
          onClick={() => handleDeleteItem(id, setItemActive)}
          className="font-medium leading-cssnormal tracking-[1.12px] underline text-[0.875rem] text-[#D9D9D9] cursor-pointer"
        >
          Видалити
        </p>
      </div>
    </div>
  );
}
