import Image from "next/image";
import Link from "next/link";
import logoFoot from "./images/logo-foot.png";
import { useState, useEffect } from "react";
import { mobileResize } from "../constants/functions-global-logic";

export function LogoBlock() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => mobileResize(setIsMobile), []);

  return (
    <div className="flex max-md:gap-0 gap-[20px]">
      <div>
        <Image src={logoFoot} alt="Лого" className="max-md:w-[42px]" />
      </div>
      {isMobile ? (
        ""
      ) : (
        <div className="flex flex-col pt-[17px]">
          <p className="text-white font-semibold leading-cssnormal tracking-[2.88px] text-[2rem]">
            SuppHub
          </p>
          <Link
            href="#"
            className="text-white font-medium leading-cssnormal tracking-[1.2px] text-[1.25rem]"
          >
            supphub.shop
          </Link>
        </div>
      )}
    </div>
  );
}
