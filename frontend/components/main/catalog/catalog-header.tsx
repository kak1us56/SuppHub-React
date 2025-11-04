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
      className={`flex justify-between max-md:pt-[20px] max-md:pb-[30px] max-md:gap-2 max-md:flex-col pt-[76px] pb-[50px] ${handjet.className}`}
    >
      <p className="text-[#D9D9D9] max-md:text-[2.25rem] max-md:tracking-[2px] text-[96px] font-medium tracking-[7.68px] leading-cssnormal">
        Каталог
      </p>
      <p className="text-[#D9D9D9] max-md:pt-0 max-md:text-[1.75rem] max-md:tracking-[1px] text-[36px] font-medium tracking-[2.88px] pt-[45px] leading-cssnormal">
        {items.length} продуктів
      </p>
    </div>
  );
}
