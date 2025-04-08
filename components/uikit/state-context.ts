import { createContext } from "react";

export interface StatesType {
    aboutActive: boolean;
    setAboutActive: (active: boolean) => void;
    contactsActive: boolean;
    setContactsActive: (active: boolean) => void;
    basketActive: boolean;
    setBasketActive: (active: boolean) => void;
}

export const StateContext = createContext<StatesType | null>(null);
