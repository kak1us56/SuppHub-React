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
        className="flex items-center gap-4 max-md:gap-[5px] max-md:z-[5]"
      >
        <Image className="max-md:w-[32px]" src={logoImg} alt="logo" />
        <Image className="max-md:w-[100px]" src={logoText} alt="logo" />
      </div>
    </Link>
  );
}
