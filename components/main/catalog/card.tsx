import Image from "next/image";
import hit from "./images/hit.png";
import vegan from "./images/vegan.png";
import { useEffect, useState } from "react";
import { cardProps } from "../../constants/interfaces";
import { cardCounterDe, cardCounterIn, controlCardCounter, handlePushCount } from "./card-logic";

export const Card: React.FC<cardProps> = ({ hitBool, veganBool, img, name, price, id }) => {
  const [cardCounter, setCardCounter] = useState<number>(0);

  // Reset count
  useEffect(() => controlCardCounter(id, setCardCounter), []);

  return (
    <div
      className="relative bg-[#343434] max-md:w-[8.75rem] max-md:h-[12.5rem] max-md:rounded-[12px]
      w-[20rem] h-[28.75rem] rounded-[20px] flex flex-col"
    >
      <div
        className="flex justify-center max-md:w-[8.75rem] max-md:h-[6.5rem]
        max-md:rounded-t-[12px] w-[20rem] h-[15.875rem] rounded-t-[20px] bg-[#494949]"
      >
        <div
          className={`absolute max-md:top-[2px] max-md:left-0 top-[5px] left-[2px] ${hitBool ? "hidden" : "block"}`}
        >
          <Image src={hit} alt="Хіт" className="max-md:w-[2.125rem]" />
        </div>
        <div className="max-md:pt-[14px] pt-[42px]">
          <Image src={img} alt="Товар" className="max-md:w-[2.625rem]" />
        </div>
        <div
          className={`absolute max-md:top-[5px] max-md:right-[9px] top-[18px] right-[21px] ${veganBool ? "hidden" : "block"}`}
        >
          <Image src={vegan} alt="Веганське" className="max-md:w-[1.1875rem]" />
        </div>
      </div>
      <div className="flex flex-col pl-[18px] max-md:pl-2">
        <p
          className="max-md:pt-[6px] max-md:text-[1rem]/[16px] max-md:tracking-[1.64px]
          pt-[14px] text-[1.75rem]/[35px] text-[#F90] tracking-[3.64px] font-semibold"
        >
          {name}
        </p>
        <p className="max-md:text-[0.875rem] max-md:tracking-[1px] text-[1.25rem] tracking-[2.6px] text-[#F90] font-medium">
          {price} ₴
        </p>
        <div className="max-md:py-[6px] max-md:gap-2 py-[14px] flex self-center gap-[14px] items-center">
          <div
            className="user-select max-md:w-[14px] max-md:h-[14px] flex justify-center items-center
              w-[23px] h-[23px] bg-[#494949] rounded-full cursor-pointer font-normal"
            onClick={() => cardCounterDe(cardCounter, setCardCounter)}
          >
            -
          </div>
          <div className="text-[#F90] max-md:text-[1rem]/[16px] max-md:tracking-[1px] text-[1.25rem]/[35px] tracking-[2.6px] font-medium">
            {cardCounter}
          </div>
          <div
            className="user-select max-md:w-[14px] max-md:h-[14px] flex justify-center items-center
              w-[23px] h-[23px] bg-[#494949] rounded-full cursor-pointer font-normal"
            onClick={() => cardCounterIn(cardCounter, setCardCounter)}
          >
            +
          </div>
        </div>
        <div
          onClick={() => handlePushCount(id, cardCounter)}
          className="flex max-md:w-[5.5rem] max-md:h-[1.8rem] max-md:rounded-[16px] justify-center items-center
            self-center w-[9.8125rem] h-[3.125rem] cursor-pointer rounded-[40px] bg-[#F90]"
        >
          <p className="max-md:text-[0.875rem]/[16px] max-md:tracking-[1px] text-[1.25rem]/[35px] tracking-[2.6px] text-white font-medium">
            В корзину
          </p>
        </div>
      </div>
    </div>
  );
}
