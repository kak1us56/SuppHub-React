import { useContext, useState, useEffect } from "react";
import { StateContext, StatesType } from "../../uikit/state-context";
import Image from "next/image";
import convert from "./images/convert.png";
import tgIcon from "./images/tg-icon.png";
import phoneIcon from "./images/phone.png";
import Link from "next/link";

import { Handjet } from "next/font/google";
import { mobileResize } from "../../constants/functions-global-logic";
import { sendMetrik } from "../../utils";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function ContactsMobilePopup() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const states: StatesType = useContext(StateContext);

  useEffect(() => mobileResize(setIsMobile), []);

  return (
    <div
      className={`fixed w-[100%] min-h-[100vh] bg-[#343434] pb-[62px] pt-3 px-8 z-[8] popup-transition
            ${states.contactsActive ? "translate-none" : "-translate-y-full"}
            ${isMobile ? "block" : "hidden"}`}
    >
      <h1
        className={`${handjet.className} pt-6 pb-2 text-[#D9D9D9] tracking-[1.5px] text-[2rem] font-medium`}
      >
        Контакти
      </h1>
      <div className="flex items-center flex-col pt-[38px] gap-[21px]">
        <div className="flex gap-[6px] items-center">
          <div>
            <Image className="h-5" src={convert} alt="Пошта" />
          </div>
          <Link
            href="mailto:contact.supphub@gmail.com"
            className="leading-cssnormal tracking-[1.2px] text-[1rem] text-white font-medium"
          >
            contact.supphub@gmail.com
          </Link>
        </div>
        <div className="flex gap-[6px] items-center">
          <div>
            <Image className="h-5 w-5" src={tgIcon} alt="Телеграм" />
          </div>
          <Link
            href="https://t.me/supphub_manager"
            target="_blank"
            onClick={() => sendMetrik("click", "ClickToTelegram", "Socials", "Mobile")}
            className="leading-cssnormal tracking-[1.2px] text-[1rem] text-white font-medium"
          >
            t.me/supphub_manager
          </Link>
        </div>
        <div className="flex gap-[6px] items-center">
          <div>
            <Image className="h-5 w-5" src={phoneIcon} alt="Телефон" />
          </div>
          <Link
            href="tel:+380737227307"
            target="_blank"
            onClick={() => sendMetrik("click", "ClickToPhone", "Socials", "Mobile")}
            className="leading-cssnormal tracking-[1.2px] text-[1rem] text-white font-medium"
          >
            +380-737-227-307
          </Link>
        </div>
      </div>
    </div>
  );
}
