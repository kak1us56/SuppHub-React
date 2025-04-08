import { Handjet } from "next/font/google";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function CatalogHeader() {
  return (
    <div
      className={`flex justify-between max-md:pt-[20px] max-md:pb-[30px] max-md:gap-2 max-md:flex-col pt-[76px] pb-[50px] ${handjet.className}`}
    >
      <p className="text-[#D9D9D9] max-md:text-[2.25rem] max-md:tracking-[2px] text-[96px] font-medium tracking-[7.68px] leading-cssnormal">
        Каталог
      </p>
      <p className="text-[#D9D9D9] max-md:pt-0 max-md:text-[1.75rem] max-md:tracking-[1px] text-[36px] font-medium tracking-[2.88px] pt-[45px] leading-cssnormal">
        6 продуктів
      </p>
    </div>
  );
}
