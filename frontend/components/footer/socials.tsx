import Image from "next/image";
import Link from "next/link";
import instIcon from "./images/inst-icon.png";
import tgIcon from "./images/tg-icon.png";
import { useEffect, useState } from "react";
import { mobileResize } from "../constants/functions-global-logic";
import { sendMetrik } from "../utils";

export function Socials() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => mobileResize(setIsMobile), []);

  return (
    <div className="flex flex-col max-sm:gap-[6px] gap-[11px]">
      <Link
        href="https://www.instagram.com/supphub.shop"
        target="_blank"
        className="flex gap-3 items-center"
        onClick={() => sendMetrik("click", "ClickToInstagram", "Socials", isMobile ? "Mobile" : "Desktop")}
      >
        <div>
          <Image src={instIcon} alt="Інстаграм" className="max-sm:w-5" />
        </div>
        <span
          className="text-white font-bold leading-cssnormal tracking-[1.44px] text-[1rem] max-sm:hidden"
        >
          instagram.com/supphub.shop
        </span>
      </Link>
      <Link
        href="https://t.me/supphub_manager"
        target="_blank"
        className="flex gap-3 items-center"
        onClick={() => sendMetrik("click", "ClickToTelegram", "Socials", isMobile ? "Mobile" : "Desktop")}
      >
        <div>
          <Image src={tgIcon} alt="Телеграм" className="max-sm:w-5" />
        </div>
        <span
          className="text-white font-bold leading-cssnormal tracking-[1.44px] text-[1rem] max-sm:hidden"
        >
          t.me/supphub_manager
        </span>
      </Link>

    </div>
  );
}
