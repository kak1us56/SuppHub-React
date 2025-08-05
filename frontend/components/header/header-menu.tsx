import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { StateContext, StatesType } from "../uikit/state-context";
import { controlBasketSum, mobileResize } from "../constants/functions-global-logic";
import { controlIndicator, handleBurger } from "./header-logic";

interface HeaderMenuProps {
  isBasket: boolean;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ isBasket }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [basketSum, setBasketSum] = useState<number>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [indicActive, setIndicActive] = useState<boolean>(false);
  const states: StatesType = useContext(StateContext);

  // Mobile
  useEffect(() => mobileResize(setIsMobile));

  // Basket sum
  useEffect(() => controlBasketSum(setBasketSum), []);

  // Indicator active
  useEffect(() => controlIndicator(setIndicActive), [])

  return (
    <>
      {isMobile ? (
        <div onClick={() => handleBurger(isMenuOpen, setIsMenuOpen)} className="relative transition-linear">
          <div className="inline-block w-[40px] h-[24px] relative z-[5] transition-linear">
            <span
              className={`${isMenuOpen ? "hidden" : "inline-block"} w-[30px] h-[2px] bg-[#D9D9D9] absolute left-[5px] top-0 transition-linear`}
            ></span>
            <span
              className={`${isMenuOpen ? "rotate-45" : "rotate-0"} w-[30px] h-[2px] bg-[#D9D9D9] absolute left-[5px] top-[11px] transition-linear`}
            ></span>
            <span
              className={`${isMenuOpen ? "-rotate-45" : "rotate-0"} w-[30px] h-[2px] bg-[#D9D9D9] absolute left-[5px] top-[11px] transition-linear`}
            ></span>
            <span
              className={`${isMenuOpen ? "hidden" : "inline-block"} w-[30px] h-[2px] bg-[#D9D9D9] absolute left-[5px] top-[22px] transition-linear`}
            ></span>
          </div>
          <div className={`${indicActive ? 'block' : 'hidden'} absolute w-3 h-3 rounded-full bg-[#F90] top-[-4px] right-[1px] z-[6]`}></div>
        </div>
      ) : (
        ""
      )}
      <nav
        className={`max-md:bg-black max-md:fixed max-md:top-0 max-md:left-0 max-md:w-[100%] max-md:h-[100%] max-md:text-center
        max-md:pt-20 max-md:pb-[30px] max-md:py-[10px] transition-linear ${isMenuOpen ? "max-md:translate-none" : "max-md:-translate-y-full"}`}
      >
        <ul
          className="text-white flex gap-12 text-[28px] items-center font-normal tracking-[2.52px] leading-cssnormal
          max-md:flex-col max-md:text-center"
        >
          <li>
            <Link
              href="#catalog"
              className="cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                states.setAboutActive(false);
                states.setContactsActive(false);
                states.setBasketActive(false);
              }}
            >
              Каталог
            </Link>
          </li>
          <li>
            <p
              className="cursor-pointer"
              onClick={() => {
                states.setAboutActive(true);
                states.setContactsActive(false);
                states.setBasketActive(false);
                setIsMenuOpen(false);
              }}
            >
              Про нас
            </p>
          </li>
          <li>
            <p
              className="cursor-pointer"
              onClick={() => {
                states.setContactsActive(true);
                states.setBasketActive(false);
                states.setAboutActive(false);
                setIsMenuOpen(false);
              }}
            >
              Контакти
            </p>
          </li>
          <li className={`${isBasket ? 'block' : 'hidden'}`}>
            <span
              className="cursor-pointer flex items-center gap-[6px]"
              onClick={() => {
                states.setBasketActive(true);
                states.setContactsActive(false);
                states.setAboutActive(false);
                setIsMenuOpen(false);
              }}
            >
              Корзина
              <div
                className={`${Number(basketSum) === 0 ? "hidden" : "flex"} w-[30px] h-[30px] text-[24px] rounded-full bg-[#F90] items-center justify-center font-extrabold`}
              >
                {basketSum}
              </div>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
