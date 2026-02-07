interface AddToBasketMsgProps {
    isActive: boolean;
}

export const AddToBasketMsg: React.FC<AddToBasketMsgProps> = ({ isActive }) => {
    return (
        <div className={`${isActive ? "translate-y-[-2rem] max-sm:translate-y-[-1rem]" : "translate-y-[100%]"} max-sm:text-[.75rem] max-sm:w-[13.7rem]
            max-sm:h-[2rem] max-sm:p-0 max-sm:r-[0.75rem] leading-cssnormal bottom-0 z-[5] transition-15 fixed right-8 bg-[#8c8c8c] text-white
            rounded-[40px] text-center h-[3.125rem] px-4 tracking-[1.8px] text-[1.25rem] flex justify-center items-center opacity-1`}>
            Товар додано в корзину
        </div>
    )
}