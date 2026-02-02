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
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className="flex flex-wrap justify-center max-sm:gap-y-[14px] max-sm:gap-x-[10px] gap-y-[73px] gap-x-[118px] max-lg:gap-y-9 max-lg:gap-x-10 pb-[106px] max-sm:pb-[50px]">
      {
        items.map((item) => (
          <Card
            hitBool={item.hitBool}
            veganBool={item.veganBool}
            name={item.name}
            price={item.price}
            img={item.img}
            amount={item.amount}
            id={item.id}
            slug={item.slug}
            key={item.id}
          />
        )) || 'Наразі немає товару в наявності'
      }
      {/* <Card
        hitBool={false}
        veganBool={false}
        name="L-tyrosine"
        price={220}
        img={}
        id="1"
      /> */}
    </div>
  );
}
