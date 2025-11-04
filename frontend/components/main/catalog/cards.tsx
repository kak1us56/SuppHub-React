import { Card } from "./card";
import { useEffect, useState } from "react";
import { cardProps } from "../../constants/interfaces";

export function Cards() {
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
    <div className="flex flex-wrap justify-center max-md:gap-y-[18px] max-md:gap-x-[30px] gap-y-[73px] gap-x-[118px] pb-[106px]">
      {
        items.map((item) => (
          <Card
            hitBool={item.hitBool}
            veganBool={item.veganBool}
            name={item.name}
            price={item.price}
            img={item.img}
            id={item.id}
            key={item.id}
          />
        )) || 'Наразі немає товару в наявності'
      }
    </div>
  );
}
