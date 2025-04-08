import { useContext, useState, useEffect } from "react";
import { StateContext, StatesType } from "../../uikit/state-context";

import { Handjet } from "next/font/google";
import { mobileResize } from "../../constants/functions-global-logic";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function AboutMobilePopup() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const states: StatesType = useContext(StateContext);

  useEffect(() => mobileResize(setIsMobile), []);

  return (
    <div
      className={`fixed w-[100%] min-h-[100vh] bg-[#343434] py-[62px] px-8 z-[8] popup-transition
            ${states.aboutActive ? "translate-none" : "-translate-y-full"}
            ${isMobile ? "block" : "hidden"}`}
    >
      <h1
        className={`pt-6 pb-2 text-[#D9D9D9] text-[2rem] tracking-[1.5px] ${handjet.className} font-medium`}
      >
        Про нас
      </h1>
      <div className="text-justify pt-6">
        <p className="leading-cssnormal text-white text-[1rem] tracking-[1.22px] font-normal">
          Привіт! Ми - SuppHub, і ми створені, щоб допомогти тобі бути у чудовій
          формі. Ми розуміємо, як важливо почуватися бадьоро та енергійно,
          особливо коли в тебе так багато справ – навчання, спорт, активне
          життя, або ще й екзамени чи сесія от-от. Тому ми представляємо лінійку
          добавок, що допоможуть тобі витримати шалений ритм.
          <br />
          <br />У нас ти знайдеш амінокислоти, вітаміни та інші штуки, які
          допоможуть тобі впоратися з навантаженнями та залишатись на висоті. Ми
          не обіцяємо чудес, але точно знаємо, що наші продукти допоможуть
          розкрити твій потенціал на максимум.
        </p>
      </div>
    </div>
  );
}
