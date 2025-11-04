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
          {
            isMobile ? (
              <Link href="https://www.instagram.com/supphub.shop" target="_blank">
                <Image src={instIcon} alt="Інстаграм" className="max-md:w-5" />
              </Link>
            ) : <Image src={instIcon} alt="Інстаграм" />
          }
        </div>
        {isMobile ? (
          ""
        ) : (
          <Link
            href="https://www.instagram.com/supphub.shop"
            target="_blank"
            className="text-white font-bold leading-cssnormal tracking-[1.44px] text-[1rem]"
          >
            instagram.com/supphub.shop
          </Link>
        )}
      </div>
      <div className="flex gap-3 items-center">
        <div>
          {
            isMobile ? (
              <Link href="https://t.me/supphub_manager" target="_blank">
                <Image src={tgIcon} alt="Телеграм" className="max-md:w-5" />
              </Link>
            ) : <Image src={tgIcon} alt="Телеграм" />
          }
        </div>
        {isMobile ? (
          ""
        ) : (
          <Link
            href="https://t.me/supphub_manager"
            target="_blank"
            className="text-white font-bold leading-cssnormal tracking-[1.44px] text-[1rem]"
          >
            t.me/supphub_manager
          </Link>
        )}
      </div>
    </div>
  );
}
