import { StaticImageData } from "next/image";

export interface cardProps {
    hitBool?: boolean;
    veganBool?: boolean;
    img: StaticImageData;
    name: string;
    price: number;
    amount?: number;
    id: string;
}