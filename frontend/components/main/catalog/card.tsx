import Image from "next/image";
import hit from "./images/hit.png";
import vegan from "./images/vegan.png";
import { useEffect, useState } from "react";
import { cardProps } from "../../constants/interfaces";
import { cardCounterDe, cardCounterIn, controlCardCounter, handlePushCount } from "./card-logic";
import { mobileResize } from "../../constants/functions-global-logic";

export const Card: React.FC<cardProps> = ({ hitBool, veganBool, img, name, price, id }) => {
  const [cardCounter, setCardCounter] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //   Mobile
  useEffect(() => mobileResize(setIsMobile), []);

  // Reset count
  // useEffect(() => controlCardCounter(id, setCardCounter), []);

  return (
    <div
      className="relative bg-[#343434] max-md:w-[9.6rem] max-md:h-[15.5rem] max-md:rounded-[12px]
      w-[20rem] h-[28.75rem] rounded-[20px] flex flex-col"
    >
      <div
        className="flex justify-center max-md:w-[9.6rem] max-md:h-[7.5rem]
        max-md:rounded-t-[12px] w-[20rem] h-[15.875rem] rounded-t-[20px] bg-[#494949]"
      >
        <div
          className={`absolute max-md:top-[2px] max-md:left-0 top-[5px] left-[2px] ${hitBool ? "block" : "hidden"}`}
        >
          <Image src={hit} alt="Хіт" className="max-md:w-[2.6rem]" />
        </div>
        <div className="max-md:pt-[20px] pt-[42px]">
          <Image src={img} width={100} height={100} alt="Товар" className="max-md:w-[2.85rem]" />
        </div>
        <div
          className={`absolute max-md:top-[5px] max-md:right-[9px] top-[18px] right-[21px] ${veganBool ? "block" : "hidden"}`}
        >
          <Image src={vegan} alt="Веганське" className="max-md:w-[1.9rem]" />
        </div>
      </div>
      <div className="flex flex-col">
        <p
          className="max-md:pt-[6px] max-md:text-[0.9rem]/[16px] max-md:tracking-[1.64px] max-md:pl-2 pl-[18px]
          pt-[14px] text-[1.75rem]/[35px] text-[#F90] tracking-[3.64px] font-semibold"
        >
          {name}
        </p>
        <p className="max-md:text-[0.875rem] max-md:tracking-[1px] max-md:pl-2 text-[1.25rem] tracking-[2.6px] text-[#F90] font-medium pl-[18px]">
          {price} ₴
        </p>
        <div className={`flex max-md:py-[7px] max-md:gap-[0.75rem] py-[14px] self-center gap-[14px] items-center`}>
          <div
            className="user-select max-md:w-[25px] max-md:h-[25px] text-[1.5rem] flex justify-center items-center
              w-[23px] h-[23px] bg-[#494949] rounded-full cursor-pointer font-normal"
            onClick={() => cardCounterDe(cardCounter, setCardCounter)}
          >
            -
          </div>
          <div className="text-[#F90] max-md:text-[1.2rem]/[16px] max-md:tracking-[1px] text-[1.25rem]/[35px] tracking-[2.6px] font-medium">
            {cardCounter}
          </div>
          <div
            className="user-select max-md:w-[25px] max-md:h-[25px] text-[1.5rem] flex justify-center items-center
              w-[23px] h-[23px] bg-[#494949] rounded-full cursor-pointer font-normal"
            onClick={() => cardCounterIn(cardCounter, setCardCounter)}
          >
            +
          </div>
        </div>
        <div
          onClick={() => handlePushCount(id, cardCounter)}
          className="flex max-md:w-[8.5rem] max-md:h-[2.25rem] max-md:rounded-[16px] justify-center items-center
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
