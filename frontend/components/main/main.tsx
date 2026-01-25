import { useState } from "react";
import { BgImg } from "./bg-img/bg-img";
import { Catalog } from "./catalog";
import { AddToBasketMsg } from "./catalog/add-to-basket-msg";
import { AddToBasketState, AddToBasketStateStateContext } from "./catalog/state-context";

export function Main() {
  const [isAddToBasketActive, setIsAddToBasketActive] = useState<boolean>(false);

  const states: AddToBasketState = {
    isAddToBasketActive,
    setIsAddToBasketActive,
  }

  return (
    <main>
      <AddToBasketStateStateContext.Provider value={states}>
        <AddToBasketMsg isActive={isAddToBasketActive} />
        <BgImg />
        <Catalog />      
      </AddToBasketStateStateContext.Provider>

    </main>
  );
}
