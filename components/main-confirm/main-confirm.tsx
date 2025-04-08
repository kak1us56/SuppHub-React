import { Handjet } from "next/font/google";
import { ConfirmForm } from "./confirm-form";
import { ConfirmTotal } from "./confirm-total";

const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function MainConfirm() {
    return (
        <div className="min-h-[1311px] bg-[#1F1F1F] mt-20 bg-repeat bg-pill bg-[length:250px]">
            <div className="max-w-[1312px] max-md:max-w-[352px] mx-auto px-4">
                <div>
                    <h1 className={`${handjet.className}
                        text-[#D9D9D9] leading-cssnormal tracking-[5.12px] text-[4rem] py-[68px] font-medium`}>
                        Оформлення замовлення
                    </h1>
                </div>
                <div className="min-h-[1064px]">
                    <ConfirmForm />
                    <ConfirmTotal />
                </div>
            </div>
        </div>
    )
}