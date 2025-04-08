export function controlTotalItems(
    id: string,
    setIsActive: (active: boolean) => void,
    setItemAmount: (amount: string) => void
) {
    const updateTotalItems = () => {
        if (Number(localStorage.getItem(`itemAmount${id}`)) === 0) {
            setIsActive(false);
        } else {
            setIsActive(true);
            setItemAmount(localStorage.getItem(`itemAmount${id}`));
        }
    };

    updateTotalItems();

    window.addEventListener("storage", updateTotalItems);

    return () => {
      window.removeEventListener("storage", updateTotalItems);
    };
}