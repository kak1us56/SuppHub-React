import Image from "next/image";
import { UiPopup } from "../../uikit/ui-popup";
import convert from "./images/convert.png";
import tgIcon from "./images/tg-icon.png";
import Link from "next/link";
import { useContext } from "react";
import { StateContext, StatesType } from "../../uikit/state-context";

export function ContactsPopup() {
  const states: StatesType = useContext(StateContext);

  return (
    <UiPopup
      heigth="min-h-[17.5rem]"
      width="w-[37.5rem]"
      header="Контакти"
      active={states.contactsActive}
      setActive={states.setContactsActive}
    >
      <div className="pt-[64px] flex flex-col items-center gap-[21px]">
        <div className="flex gap-[14px] items-center">
          <div>
            <Image src={convert} alt="Конверт" />
          </div>
          <Link
            href="#"
            className="text-white font-medium leading-cssnormal tracking-[1.8px] text-[1.25rem]"
          >
            contact.supphub@gmail.com
          </Link>
        </div>
        <div className="flex gap-[14px] items-center">
          <div>
            <Image src={tgIcon} alt="Telegram" />
          </div>
          <Link
            href="#"
            className="text-white font-medium leading-cssnormal tracking-[1.8px] text-[1.25rem]"
          >
            t.me/supphub_manager
          </Link>
        </div>
      </div>
    </UiPopup>
  );
}
