import Image from "next/image";
import logoImg from "./images/logo-img.png";
import { StateContext, StatesType } from "../../uikit/state-context";
import { UiPopup } from "../../uikit/ui-popup";
import { useContext, useEffect, useState } from "react";
import { laptopResize } from "../../constants/functions-global-logic";

export function AboutPopup() {
  const states: StatesType = useContext(StateContext);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);

  useEffect(() => laptopResize(setIsLaptop), []);  

  return (
    <UiPopup
      header="Про нас"
      active={states.aboutActive}
      setActive={states.setAboutActive}
      width="w-[60rem]"
      heigth={isLaptop ? "min-h-[39.5rem]" : "min-h-[50rem]"}
    >
      <div className={`text-justify ${isLaptop ? "pt-[30px] pb-[20px]" : "pt-[70px] pb-[50px]"} px-[93px]`}>
        <p className={`leading-cssnormal ${isLaptop ? "tracking-[2px] text-[1.55rem]" : "tracking-[2.52px] text-[1.75rem]"} text-white font-normal`}>
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
      <div>
        <Image src={logoImg} alt="Logo" />
      </div>
    </UiPopup>
  );
}
