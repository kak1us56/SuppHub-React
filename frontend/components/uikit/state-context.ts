import { createContext } from "react";
import { RefObject } from "react";
import { SelectInstance } from "react-select";
import Select from "react-select/dist/declarations/src/Select";
import { OptionType } from "../main-confirm/form-place";

export interface StatesType {
    aboutActive: boolean;
    setAboutActive: (active: boolean) => void;
    contactsActive: boolean;
    setContactsActive: (active: boolean) => void;
    basketActive: boolean;
    setBasketActive: (active: boolean) => void;
}

export const StateContext = createContext<StatesType | null>(null);


export interface StatesConfirmType {
  inputNameRef: RefObject<HTMLInputElement>;
  inputVornameRef: RefObject<HTMLInputElement>;
  inputTelRef: RefObject<HTMLInputElement>;
  regionSelectRef: RefObject<SelectInstance<OptionType>>;
  citySelectRef: RefObject<SelectInstance<OptionType>>;
  warehouseSelectRef: RefObject<SelectInstance<OptionType>>;
  textareaCommentRef: RefObject<HTMLTextAreaElement>;
  inputPromocodeRef: RefObject<HTMLInputElement>;
  checkboxCallMeRef: RefObject<HTMLInputElement>;

  isRequiredNameActive: boolean;
  isRequiredVornameActive: boolean;
  isRequiredTelActive: boolean;
  isIncorrectTelActive: boolean;
  isRequiredRegionActive: boolean;
  isRequiredCityActive: boolean;
  isRequiredWarehouseActive: boolean;
}

export const StateContextConfirm = createContext<StatesConfirmType | null>(null);
