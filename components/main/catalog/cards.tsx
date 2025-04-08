import { Card } from "./card";
import { productName1, productName2, productName3, productName4, productName5, productName6, productPrice1,
    productPrice2, productPrice3, productPrice4, productPrice5, productPrice6, productImg1, productImg2,
    productImg3, productImg4, productImg5, productImg6 } from "../../constants/constants";

export function Cards() {
  return (
    <div className="flex flex-wrap justify-center max-md:gap-y-[18px] max-md:gap-x-[30px] gap-y-[73px] gap-x-[118px]">
      <Card
        hitBool={true}
        veganBool={true}
        name={productName1}
        price={productPrice1}
        img={productImg1}
        id='1'
      />
      <Card
        hitBool={true}
        veganBool={true}
        name={productName2}
        price={productPrice2}
        img={productImg2}
        id='2'
      />
      <Card
        hitBool={true}
        veganBool={true}
        name={productName3}
        price={productPrice3}
        img={productImg3}
        id='3'
      />
      <Card
        hitBool={true}
        veganBool={true}
        name={productName4}
        price={productPrice4}
        img={productImg4}
        id='4'
      />
      <Card
        hitBool={true}
        veganBool={true}
        name={productName5}
        price={productPrice5}
        img={productImg5}
        id='5'
      />
      <Card
        hitBool={true}
        veganBool={true}
        name={productName6}
        price={productPrice6}
        img={productImg6}
        id='6'
      />
    </div>
  );
}
