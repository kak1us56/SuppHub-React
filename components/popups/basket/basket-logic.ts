import { RefObject } from "react";

export function controlBasketItems(
    id: string,
    setItemActive: (active: boolean) => void,
    itemSelect: RefObject<HTMLSelectElement | null>
) {
    const updateBasketItems = () => {
        if (Number(localStorage.getItem(`itemAmount${id}`)) === 0) {
            setItemActive(false);
        } else {
            setItemActive(true);
        }

        itemSelect.current.childNodes.forEach((e) => {
            if (e instanceof HTMLOptionElement && e.value == localStorage.getItem(`itemAmount${id}`)) {
                e.selected = true;
            }
        });
    };

    updateBasketItems();

    window.addEventListener("storage", updateBasketItems);

    return () => {
        window.removeEventListener("storage", updateBasketItems);
    };
}

// Select change amount
export function handleSelectChange(id: string, itemSelect: RefObject<HTMLSelectElement | null>) {
    const selectValue: string = itemSelect.current.value;

    localStorage.setItem(`itemAmount${id}`, selectValue);

    const basketSummVar =
        Number(localStorage.getItem("itemAmount1")) +
        Number(localStorage.getItem("itemAmount2")) +
        Number(localStorage.getItem("itemAmount3")) +
        Number(localStorage.getItem("itemAmount4")) +
        Number(localStorage.getItem("itemAmount5")) +
        Number(localStorage.getItem("itemAmount6"));
    localStorage.setItem("itemAmountSumm", basketSummVar.toString());

    window.dispatchEvent(new Event("storage"));
}