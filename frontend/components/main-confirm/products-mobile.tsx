import { useEffect, useState } from "react";
import { cardProps } from "../constants/interfaces";
import { ConfirmTotalItem } from "./confirm-total-item";

export const ProductsMobile = () => {
    const [items, setItems] = useState<cardProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch("/api/products/");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
        };

        fetchData();
    }, [])

    return (
        <div className="rounded-[25px] w-full min-h-[72px] bg-[#5E5A53] pl-3 pb-5">
            <h2 className="text-[1.15rem]/[20px] leading-cssnormal py-3 text-white font-semibold">
                РАЗОМ
            </h2>
            <div className="flex flex-col gap-[8px] min-h-5 max-h-[104px] overflow-y-auto max-w-[17.5rem] pr-4">
                {items.map((item) => (
                    <ConfirmTotalItem key={item.id} name={item.name} id={item.id} />
                ))}
            </div>
        </div>
    )
}