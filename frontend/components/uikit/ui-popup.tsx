import { useEffect, useState, ReactNode } from "react";
import { CrossIcon } from "./images/cross";

import { Handjet } from "next/font/google";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  header: string;
  children: ReactNode;
  width: string;
  heigth: string;
}

export const UiPopup: React.FC<Props> = ({
  active,
  setActive,
  header,
  children,
  width,
  heigth,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (active) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [active]);

  return (
    <div
      className={`popup-transition fixed w-full h-full bg-[rgba(0,_0,_0,_0.8)] top-0 left-0 z-10
        ${active ? "visible opacity-100" : "opacity-0 invisible"}
        ${isMobile ? "hidden" : "block"}`}
      onClick={(e) => {
        const target = e.target as Element;
        if (!target.closest("[data-id=modal]")) {
          setActive(false);
        }
      }}
    >
      <div className="popup-transition min-h-full flex justify-center items-center py-[30px] px-[10px]">
        <div
          data-id="modal"
          className={`popup-transition relative flex flex-col items-center ${width} ${heigth} bg-[#343434]`}
        >
          <div
            className={`flex justify-between items-center w-full px-[34px] py-[10px] min-h-[68px] bg-black ${active ? "opacity-100" : "opacity-0"}`}
          >
            <p
              className={`${handjet.className} font-medium leading-cssnormal tracking-[3.2px] text-[2.5rem] text-[#D9D9D9]`}
            >
              {header}
            </p>
            <div onClick={() => setActive(false)}>
              <CrossIcon />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
