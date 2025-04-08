// Burger
export const handleBurger = (isMenuOpen: boolean, setIsMenuOpen: (active: boolean) => void) => {
    const isOpenValue: boolean = isMenuOpen;

    isOpenValue ? setIsMenuOpen(false) : setIsMenuOpen(true);
};

export function controlIndicator(setIndicActive: (active: boolean) => void) {
    const indicActiveFunction = () => {
        if (Number(localStorage.getItem('itemAmountSumm')) === 0) {
            setIndicActive(false);
        } else {
            setIndicActive(true);
        }
    }

    indicActiveFunction();

    window.addEventListener("storage", indicActiveFunction);

    return () => {
      window.removeEventListener("storage", indicActiveFunction);
    };
}