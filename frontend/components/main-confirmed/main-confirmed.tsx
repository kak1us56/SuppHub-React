import Link from "next/link"
import { Handjet } from "next/font/google";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function MainConfirmed() {
    return (
        <main className="min-h-[calc(100vh_-_172px)] bg-pill bg-[#1F1F1F] bg-repeat max-md:bg-[length:60px] bg-[length:250px]">
            <div className="max-w-[1232px] max-md:max-w-[352px] mx-auto px-4">
                <Link href="/">
                    <p className="text-white text-[28px] leading-cssnormal font-normal tracking-[2.24px] pt-[120px]">
                        ← На головну
                    </p>
                </Link>
                <h1 className={`${handjet.className} text-[#D9D9D9] pt-[100px] text-center text-[64px] leading-cssnormal tracking-[5.12px] font-medium mx-auto`}>
                    Замовлення оформлено успішно<br />Дякуємо Вам за довіру!
                </h1>
            </div>
        </main>
    )
}