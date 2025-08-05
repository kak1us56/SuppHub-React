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
  checkboxCallMeRef: RefObject<HTMLInputElement>;
}

export const StateContextConfirm = createContext<StatesConfirmType | null>(null);
