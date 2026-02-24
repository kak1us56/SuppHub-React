import Link from "next/link";
import Image from "next/image";
import cart from "./images/shopping-cart.png";
// import { Link, animateScroll as scroll } from "react-scroll";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  // Mobile
  useEffect(() => mobileResize(setIsMobile));

  // Basket sum
  useEffect(() => controlBasketSum(setBasketSum), []);

  // Indicator active
  useEffect(() => controlIndicator(setIndicActive), [])

  // isBasketOpen
  const handleCartClick = () => {
    if (states.basketActive) {
      states.setBasketActive(false);
    } else {
      states.setBasketActive(true);
    }

    states.setContactsActive(false);
    states.setAboutActive(false);
    setIsMenuOpen(false);
  }

  return (
    <>
      {isMobile ? (
        <div className="flex gap-4 pt-[6px]">
          <div
            className={`${isBasket ? "block" : "hidden"} mt-[-4px] relative`}
            onClick={handleCartClick}  
          >
            <Image height={32} src={cart} alt="Кошик" />
            <div className={`${indicActive ? 'block' : 'hidden'} absolute w-2 h-2 rounded-full bg-[#F90] top-[6px] right-[-1px] z-[0]`}></div>
          </div>
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
          </div>        
        </div>
      ) : (
        ""
      )}
      <nav
        className={`max-sm:bg-black max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:w-[100%] max-sm:h-[100%] max-sm:text-center
        max-sm:pt-20 max-sm:pb-[30px] max-sm:py-[10px] transition-linear ${isMenuOpen ? "max-sm:translate-none" : "max-sm:-translate-y-full"}`}
      >
        <ul
          className="text-white flex gap-12 text-[1.75rem] items-center font-normal tracking-[2.52px] leading-cssnormal
          max-sm:flex-col max-sm:text-center max-sm:gap-12 max-sm:text-[1.75rem] max-lg:gap-4 max-lg:text-[1.4rem] max-lg:tracking-[1.48px]"
        >
          <li>
            <Link
              href="/#catalog"
              // to="catalog"
              // activeClass="active"
              // spy={true}
              // smooth={true}
              // offset={-70}
              // duration={500}
              onClick={() => {
                setIsMenuOpen(false);
                // states.setAboutActive(false);
                states.setContactsActive(false);
                states.setBasketActive(false);

                // router.push('/#catalog');
              }}
            >
              Каталог
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="cursor-pointer"
              onClick={() => {
                // states.setAboutActive(true);
                states.setContactsActive(false);
                states.setBasketActive(false);
                setIsMenuOpen(false);

                // router.push('/about');
              }}
            >
              Про нас
            </Link>
          </li>
          <li>
            <button
              className="cursor-pointer"
              onClick={() => {
                states.setContactsActive(true);
                states.setBasketActive(false);
                // states.setAboutActive(false);
                setIsMenuOpen(false);
              }}
            >
              Контакти
            </button>
          </li>
          <li className={`${isBasket ? 'block' : 'hidden'}`}>
            <button
              className="cursor-pointer flex items-center gap-[6px]"
              onClick={() => {
                states.setBasketActive(true);
                states.setContactsActive(false);
                states.setAboutActive(false);
                setIsMenuOpen(false);
              }}
            >
              Корзина
              <span
                className={`${Number(basketSum) === 0 ? "hidden" : "flex"} w-[30px] h-[30px] text-[24px] rounded-full bg-[#F90] items-center justify-center font-extrabold`}
              >
                {basketSum}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
