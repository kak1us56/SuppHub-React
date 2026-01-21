import Head from "next/head";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { BasketMobilePopup } from "../../components/mobile popups/basket";
import { ContactsMobilePopup } from "../../components/mobile popups/contacts";
import { BasketPopup } from "../../components/popups/basket";
import { ContactsPopup } from "../../components/popups/contacts";
import { StateContext, StatesType } from "../../components/uikit/state-context";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cardProps } from "../../components/constants/interfaces";
import { MainProduct } from "../../components/main-product";

export const dynamic = 'force-dynamic';


export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<cardProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [aboutActive, setAboutActive] = useState<boolean>(false);
    const [contactsActive, setContactsActive] = useState<boolean>(false);
    const [basketActive, setBasketActive] = useState<boolean>(false);

    const states: StatesType = {
        aboutActive,
        setAboutActive,
        contactsActive,
        setContactsActive,
        basketActive,
        setBasketActive,
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}/`);

                if (!res.ok) {
                    throw new Error(`Error API: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                setProduct(data);
            } catch (e) {
                console.log("Error while getting the product: " + e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    return (
        <>
            <Head>
                <title>{product?.name}</title>
                <link rel="shortcut icon" href="/logo-img.png" type="image/x-icon" />
            </Head>
            <StateContext.Provider value={states}>
                <ContactsMobilePopup />
                <ContactsPopup />
                <BasketMobilePopup />
                <BasketPopup />
                <Header isBasket={true} />
                <main>
                    <div className="min-h-[calc(100vh_-_80px_-_172px)] bg-pill bg-[#1F1F1F] bg-repeat max-md:bg-[length:60px] bg-[length:250px] mt-20 max-md:mt-[48px]">
                        {!loading && product && <MainProduct product={product} />}
                    </div>
                </main>
                
                <Footer />
            </StateContext.Provider>
        </>
    )
}

export async function getStaticPaths() {
  try {
      const res = await fetch('http://api:8000/api/products/');
      const products = await res.json();

      const paths = products.map((product: any) => ({
        params: { id: product.id.toString() },
      }));

      return { paths, fallback: false };
  } catch (e) {
      console.log('Build error: API not available');
      return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }: any) {
  return { props: {} }; 
}

