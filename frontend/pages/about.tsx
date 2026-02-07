import Head from "next/head";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { BasketMobilePopup } from "../components/mobile popups/basket";
import { ContactsMobilePopup } from "../components/mobile popups/contacts";
import { BasketPopup } from "../components/popups/basket";
import { ContactsPopup } from "../components/popups/contacts";
import { StateContext, StatesType } from "../components/uikit/state-context";

import { useState } from "react";
import { MainAbout } from "../components/main-about";

export default function AboutPage() {
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

    return (
        <>
            <Head>
                <title>Про нас</title>
                <link rel="shortcut icon" href="/logo-img.png" type="image/x-icon" />
                <meta 
                    name="description" 
                    content="SuppHub — твій компаньйон у світі продуктивності. Ми підбираємо ноотропи, вітаміни та амінокислоти, які реально працюють для покращення пам’яті та енергії." 
                    />
                <meta name="keywords" content="ноотропи, вітаміни, енергія, SuppHub, бади україна, купити амінокислоти, амінокислоти" />
                <meta property="og:title" content="SuppHub — Твій потенціал на максимум" />
                <meta property="og:description" content="Ноотропи та вітаміни для ефективного навчання та роботи." />
                <meta property="og:image" content="/logo-img.png" />
            </Head>
            <StateContext.Provider value={states}>
                <ContactsMobilePopup />
                <ContactsPopup />
                <BasketMobilePopup />
                <BasketPopup />
                <Header isBasket={true} />
                <MainAbout />
                <Footer />
            </StateContext.Provider>
        </>
    )
}
