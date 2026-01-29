import Head from "next/head";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { BasketMobilePopup } from "../../components/mobile popups/basket";
import { ContactsMobilePopup } from "../../components/mobile popups/contacts";
import { BasketPopup } from "../../components/popups/basket";
import { ContactsPopup } from "../../components/popups/contacts";
import { StateContext, StatesType } from "../../components/uikit/state-context";

import { useEffect, useState } from "react";
import { cardProps } from "../../components/constants/interfaces";
import { MainProduct } from "../../components/main-product";
import { useRouter } from "next/router";


const stripHtml = (html: string) => {
   if (!html) return "";
   return html.replace(/<[^>]*>?/gm, '');
};

export default function ProductPage({ product }: { product: cardProps | null }) {
    const router = useRouter();

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

    if (router.isFallback) {
        return <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center text-xl">Завантаження...</div>;
    }

    if (!product) {
        return <div className="min-h-screen bg-[#1F1F1F] text-white flex items-center justify-center text-xl">Товар не знайдено</div>;
    }

    // SEO
    const seoDescription = product.description 
        ? stripHtml(product.description).slice(0, 160) + "..." 
        : "SuppHub — твій компаньйон у світі продуктивності.";

    const ogImage = product.img 
        ? (product.img.src.startsWith('http') ? product.img.src : `https://supphub.shop${product.img}`) 
        : "/logo-img.png";

    return (
        <>
            <Head>
                <title>{product.name} | SuppHub</title>
                <link rel="shortcut icon" href="/logo-img.png" type="image/x-icon" />
                <meta 
                    name="description" 
                    content={seoDescription} 
                />
                <meta name="keywords" content={`ноотропи, вітаміни, енергія, ${product.name}, SuppHub, бади україна, купити амінокислоти, купити ${product.name}, амінокислоти`} />

                <meta property="og:title" content={`${product.name} | SuppHub`} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={ogImage} />
            </Head>
            <StateContext.Provider value={states}>
                <ContactsMobilePopup />
                <ContactsPopup />
                <BasketMobilePopup />
                <BasketPopup />
                <Header isBasket={true} />
                <main>
                    <div className="min-h-[calc(100vh_-_48px_-_80px)] max-md:min-h-[calc(100vh_-_80px_-_172px)] bg-pill bg-[#1F1F1F] bg-repeat max-md:bg-[length:60px] bg-[length:250px] mt-20 max-md:mt-[48px]">
                        <MainProduct product={product} />
                    </div>
                </main>
                
                <Footer />
            </StateContext.Provider>
        </>
    )
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  try {
      const res = await fetch(`http://api:8000/products/${id}/`);
      
      if (!res.ok) {
          return { notFound: true };
      }

      const product = await res.json();

      return { 
          props: { product },
      }; 
  } catch (e) {
      console.error(`SSR Error for id ${id}:`, e);
      return { notFound: true };
  }
}
