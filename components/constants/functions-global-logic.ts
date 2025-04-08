import { productPrice1, productPrice2, productPrice3, productPrice4, productPrice5, productPrice6 } from "./constants";

// Mobile size
export function mobileResize(setIsMobile: (active: boolean) => void) {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
}

// Items basket sum
export function controlBasketSum(setBasketSum: (sum: number) => void) {
    const updateBasketSum = () => {
        setBasketSum(Number(localStorage.getItem("itemAmountSumm")) || 0);
    };

    updateBasketSum();

    window.addEventListener("storage", updateBasketSum);

    return () => {
        window.removeEventListener("storage", updateBasketSum);
    };
}

// Delete function
export function handleDeleteItem(id: string, setItemActive: (active: boolean) => void) {
    setItemActive(false);

    localStorage.setItem(`itemAmount${id}`, "0");

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

// Prise sum
export function controlBasketTotal(setBasketTotal: (amount: number) => void) {
    const updateBasketTotal = () => {
        const sumPrice1 =
            Number(localStorage.getItem("itemAmount1")) * productPrice1;
        const sumPrice2 =
            Number(localStorage.getItem("itemAmount2")) * productPrice2;
        const sumPrice3 =
            Number(localStorage.getItem("itemAmount3")) * productPrice3;
        const sumPrice4 =
            Number(localStorage.getItem("itemAmount4")) * productPrice4;
        const sumPrice5 =
            Number(localStorage.getItem("itemAmount5")) * productPrice5;
        const sumPrice6 =
            Number(localStorage.getItem("itemAmount6")) * productPrice6;

        const fullSummPrice =
            sumPrice1 + sumPrice2 + sumPrice3 + sumPrice4 + sumPrice5 + sumPrice6;

        setBasketTotal(fullSummPrice);
    };

    updateBasketTotal();

    window.addEventListener("storage", updateBasketTotal);

    return () => {
        window.removeEventListener("storage", updateBasketTotal);
    };
}

// Basket button active
export function controlButtonActive(setButtonActive: (active: boolean) => void) {
    const buttonActiveFunction = () => {
        if (Number(localStorage.getItem('itemAmountSumm')) === 0) {
            setButtonActive(false);
        } else {
            setButtonActive(true);
        }
    }

    buttonActiveFunction();

    window.addEventListener("storage", buttonActiveFunction);

    return () => {
        window.removeEventListener("storage", buttonActiveFunction);
    };
}