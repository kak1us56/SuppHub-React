import { Handjet } from "next/font/google";
import { useEffect, useState } from "react";
import { cardProps } from "../../constants/interfaces";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function CatalogHeader() {
  const [items, setItems] = useState<cardProps[]>([])

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
    <div
      className={`flex justify-between max-sm:pt-[20px] max-sm:pb-[30px] max-sm:gap-2 max-sm:flex-col pt-[76px] pb-[50px] ${handjet.className}`}
    >
      <p className="text-[#D9D9D9] max-sm:text-[2.25rem] max-sm:tracking-[2px] text-[96px] font-medium tracking-[7.68px] leading-cssnormal">
        Каталог
      </p>
      <p className="text-[#D9D9D9] max-sm:pt-0 max-sm:text-[1.75rem] max-sm:tracking-[1px] text-[36px] font-medium tracking-[2.88px] pt-[45px] leading-cssnormal">
        {items.length} продуктів
      </p>
    </div>
  );
}
