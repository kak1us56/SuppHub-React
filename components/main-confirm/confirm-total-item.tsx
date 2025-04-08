import { useEffect, useState } from "react";
import { controlTotalItems } from "./total-item-logic";

interface ItemProps {
    name: string;
    id: string;
}

export const ConfirmTotalItem: React.FC<ItemProps> = ({ name, id }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [itemAmount, setItemAmount] = useState<string>('0');

    // Items display
    useEffect(() => controlTotalItems(id, setIsActive, setItemAmount), []);

    return (
        <div className={`${isActive ? 'flex' : 'hidden'} tracking-[1.68px] text-[1.5rem] text-white leading-cssnormal justify-between font-medium`}>
            <p>
                {name}
            </p>
            <p>
                x
                <span>
                    {itemAmount}
                </span>
            </p>
        </div>
    )
}