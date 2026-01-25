// import Link from "next/link";
import { Link, animateScroll as scroll } from "react-scroll";
import { useContext } from "react";
import { StateContext, StatesType } from "../uikit/state-context";
import { useRouter } from "next/router";

export function Menu() {
  const states: StatesType = useContext(StateContext);
  const router = useRouter();

  return (
    <div className="flex max-md:gap-4 gap-[95px]">
      <div className="flex flex-col max-md:gap-[6px] gap-[10px]">
        <Link
          // href="/about"
          onClick={() => router.push('/about')}
          className="text-white max-md:text-[0.875rem]/[16px] max-md:tracking-[1px] font-semibold cursor-pointer text-[1.25rem]/[20px] tracking-[1.4px]"
        >
          Про нас
        </Link>
        <Link
          // href="#catalog"
          activeClass="active"
          to="catalog"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={() => router.push('/#catalog')}
          className="text-white max-md:text-[0.875rem]/[16px] max-md:tracking-[1px] font-semibold cursor-pointer text-[1.25rem]/[20px] tracking-[1.4px]"
        >
          Каталог
        </Link>
      </div>
      <div className="flex flex-col max-md:gap-[6px] gap-[10px]">
        <p
          className="text-white max-md:text-[0.875rem]/[16px] max-md:tracking-[1px] font-semibold cursor-pointer text-[1.25rem]/[20px] tracking-[1.4px]"
          onClick={() => states.setContactsActive(true)}
        >
          Контакти
        </p>
        {/* <Link
          href="#"
          className="text-white max-md:text-[0.875rem]/[16px] max-md:tracking-[1px] font-semibold cursor-pointer text-[1.25rem]/[20px] tracking-[1.4px]"
        >
          Соц мережі
        </Link> */}
      </div>
    </div>
  );
}
