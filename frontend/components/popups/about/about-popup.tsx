import Image from "next/image";
import logoImg from "./images/logo-img.png";
import { StateContext, StatesType } from "../../uikit/state-context";
import { UiPopup } from "../../uikit/ui-popup";
import { useContext } from "react";

export function AboutPopup() {
  const states: StatesType = useContext(StateContext);

  return (
    <UiPopup
      header="Про нас"
      active={states.aboutActive}
      setActive={states.setAboutActive}
      width="w-[60rem]"
      heigth="min-h-[50rem]"
    >
      <div className="text-justify pt-[70px] px-[93px] pb-[50px]">
        <p className="leading-cssnormal tracking-[2.52px] text-[1.75rem] text-white font-normal">
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
