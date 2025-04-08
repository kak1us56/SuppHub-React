import Image from "next/image";
import Link from "next/link";
import instIcon from "./images/inst-icon.png";
import tgIcon from "./images/tg-icon.png";
import { useEffect, useState } from "react";
import { mobileResize } from "../constants/functions-global-logic";

export function Socials() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => mobileResize(setIsMobile), []);

  return (
    <div className="flex flex-col max-md:gap-[6px] gap-[11px]">
      <div className="flex gap-3 items-center">
        <div>
          <Image src={instIcon} alt="Інстаграм" className="max-md:w-5" />
        </div>
        {isMobile ? (
          ""
        ) : (
          <Link
            href="#"
            className="text-white font-bold leading-cssnormal tracking-[1.44px] text-[1rem]"
          >
            instagram.com/supphub
          </Link>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <div>
          <Image src={tgIcon} alt="Інстаграм" className="max-md:w-5" />
        </div>
        {isMobile ? (
          ""
        ) : (
          <Link
            href="#"
            className="text-white font-bold leading-cssnormal tracking-[1.44px] text-[1rem]"
          >
            t.me/supphub_manager
          </Link>
        )}
      </div>
    </div>
  );
}
