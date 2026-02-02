import Image from "next/image";
import logoImg from "./images/logo-img.png";
import logoText from "./images/logo-text.png";
import { useContext } from "react";
import { StateContext, StatesType } from "../uikit/state-context";
import Link from "next/link";

export function HeaderLogo() {
  const states: StatesType = useContext(StateContext);
  
  const resetPopup = () => {
    states.setAboutActive(false);
    states.setContactsActive(false);
    states.setBasketActive(false);
  };

  return (
    <Link href='/'>
      <div
        onClick={resetPopup}
        className="flex items-center gap-4 max-sm:gap-[5px] max-sm:z-[5]"
      >
        <Image className="max-sm:w-[32px] max-lg:w-[42px]" src={logoImg} alt="Логотип SuppHub" />
        <Image className="max-sm:w-[100px] max-lg:w-[130px]" src={logoText} alt="SuppHub" />
      </div>
    </Link>
  );
}
