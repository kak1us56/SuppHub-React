import { cardProps } from "../../constants/interfaces";

// Card Counter
export function cardCounterIn(cardCounter: number, setCardCounter: (count: number) => void, amount: number) {
    let maxAmount = 10;

    if (amount < 10) {
        maxAmount = amount;
    }

    if (cardCounter < maxAmount) {
        let cardCounterCopy = Number(cardCounter);
        setCardCounter(cardCounterCopy + 1);
    }
}
export function cardCounterDe(cardCounter: number, setCardCounter: (count: number) => void) {
    if (cardCounter > 1) {
        let cardCounterCopy = Number(cardCounter);
        setCardCounter(cardCounterCopy - 1);
    }
}

// Push count
export async function handlePushCount(id: string, cardCounter: number, setIsAddToBasketActive: (active: boolean) => void, setIsNoProductActive: (active: boolean) => void, amount: number) {
    let maxAmount = amount < 10 ? amount : 10;
    
    const storagedValue = Number(localStorage.getItem(`itemAmount${id}`));
    const updatedValue = storagedValue + cardCounter;

    if (updatedValue > maxAmount) {
        openMsg(setIsNoProductActive);
        return;
    }
    
    localStorage.setItem(`itemAmount${id}`, updatedValue.toString());

    let basketSummVar = 0;

    try {
        const res = await fetch("/api/products/");
        const data = await res.json();

        data.forEach((item: cardProps) => {
            basketSummVar += Number(localStorage.getItem(`itemAmount${item.id}`))
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }

    openMsg(setIsAddToBasketActive);

    localStorage.setItem("itemAmountSumm", basketSummVar.toString());
    window.dispatchEvent(new Event("storage"));
}

function openMsg(setIsActive: (active: boolean) => void) {
    setIsActive(true);

    setTimeout(() => setIsActive(false), 3000);
}

export function controlCardCounter(id: string, setCardCounter: (count: number) => void) {
    const updateCardCounter = () => {
        const storedCardCounter = Number(localStorage.getItem(`itemAmount${id}`));

        if (storedCardCounter === 0) {
            setCardCounter(1);
        } else {
            setCardCounter(storedCardCounter);
        }
    };

    updateCardCounter();

    window.addEventListener("storage", updateCardCounter);

    return () => {
        window.removeEventListener("storage", updateCardCounter);
    };
}