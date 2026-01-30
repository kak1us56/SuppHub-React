import { StaticImageData } from "next/image";

export interface cardProps {
    hitBool?: boolean;
    veganBool?: boolean;
    img: StaticImageData;
    name: string;
    price: number;
    amount?: number;
    id: string;
    slug?: string;

    pill_amount?: string;
    active_ingredients?: string;
    producer_country?: string;
    pill_form?: string;
    description?: string;
    certificate?: StaticImageData;
}