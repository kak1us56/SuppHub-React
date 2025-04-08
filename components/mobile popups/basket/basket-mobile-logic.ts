export function controlMobileBasketItems(
    id: string,
    setItemActive: (active: boolean) => void,
    setProductAmount: (amount: number) => void
) {
    const updateBasketItems = () => {
        if (Number(localStorage.getItem(`itemAmount${id}`)) === 0) {
            setItemActive(false);
        } else {
            setItemActive(true);
        }

        setProductAmount(Number(localStorage.getItem(`itemAmount${id}`)));
    };

    updateBasketItems();

    window.addEventListener("storage", updateBasketItems);

    return () => {
        window.removeEventListener("storage", updateBasketItems);
    };
}