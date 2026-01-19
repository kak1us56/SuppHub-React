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
export async function handlePushCount(id: string, cardCounter: number) {
    console.log(cardCounter);
    
    localStorage.setItem(`itemAmount${id}`, cardCounter.toString());

    let basketSummVar = 0;

    try {
        const res = await fetch("/api/products/");
        const data = await res.json();

        data.forEach((item: cardProps) => {
            basketSummVar += Number(localStorage.getItem(`itemAmount${item.id}`))
        });
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }

    localStorage.setItem("itemAmountSumm", basketSummVar.toString());
    window.dispatchEvent(new Event("storage"));
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