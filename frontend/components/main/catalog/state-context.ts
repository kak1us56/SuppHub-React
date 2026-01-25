import { createContext } from "react";

export interface AddToBasketState {
    isAddToBasketActive: boolean;
    setIsAddToBasketActive: (active: boolean) => void;
}

export const AddToBasketStateStateContext = createContext<AddToBasketState | null>(null);
