import { useState } from "react";
import { BgImg } from "./bg-img/bg-img";
import { Catalog } from "./catalog";
import { AddToBasketMsg } from "./catalog/add-to-basket-msg";
import { AddToBasketState, AddToBasketStateStateContext } from "./catalog/state-context";
import { NoProductMsg } from "./catalog/no-product-msg";

export function Main() {
  const [isAddToBasketActive, setIsAddToBasketActive] = useState<boolean>(false);
  const [isNoProductActive, setIsNoProductActive] = useState<boolean>(false);

  const states: AddToBasketState = {
    isAddToBasketActive,
    setIsAddToBasketActive,
    isNoProductActive,
    setIsNoProductActive,
  }

  return (
    <main>
      <AddToBasketStateStateContext.Provider value={states}>
        <AddToBasketMsg isActive={isAddToBasketActive} />
        <NoProductMsg isActive={isNoProductActive} />
        <BgImg />
        <Catalog />      
      </AddToBasketStateStateContext.Provider>

    </main>
  );
}
