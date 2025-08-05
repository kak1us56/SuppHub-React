// Card Counter
export function cardCounterIn(cardCounter: number, setCardCounter: (count: number) => void) {
    if (cardCounter < 10) {
        let cardCounterCopy = Number(cardCounter);
        setCardCounter(cardCounterCopy + 1);
    }
}
export function cardCounterDe(cardCounter: number, setCardCounter: (count: number) => void) {
    if (cardCounter > 0) {
        let cardCounterCopy = Number(cardCounter);
        setCardCounter(cardCounterCopy - 1);
    }
}

// Push count
export function handlePushCount(id: string, cardCounter: number) {
    localStorage.setItem(`itemAmount${id}`, cardCounter.toString());

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

export function controlCardCounter(id: string, setCardCounter: (count: number) => void) {
    const updateCardCounter = () => {
        const storedCardCounter = Number(localStorage.getItem(`itemAmount${id}`));
        setCardCounter(storedCardCounter);
    };

    updateCardCounter();

    window.addEventListener("storage", updateCardCounter);

    return () => {
        window.removeEventListener("storage", updateCardCounter);
    };
}