import Head from "next/head";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { MainConfirm } from "../components/main-confirm";
import { AboutMobilePopup } from "../components/mobile popups/about";
import { BasketMobilePopup } from "../components/mobile popups/basket";
import { ContactsMobilePopup } from "../components/mobile popups/contacts";
import { AboutPopup } from "../components/popups/about";
import { BasketPopup } from "../components/popups/basket";
import { ContactsPopup } from "../components/popups/contacts";
import { StateContext, StatesType } from "../components/uikit/state-context";

import { useState } from "react";
import { MainConfirmed } from "../components/main-confirmed/main-confirmed";

export default function ConfirmedPage() {
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
                <title>Замовлення оформлено успішно</title>
                <link rel="shortcut icon" href="/logo-img.png" type="image/x-icon" />
                <meta 
                    name="description" 
                    content="SuppHub — твій компаньйон у світі продуктивності. Ми підбираємо ноотропи, вітаміни та амінокислоти, які реально працюють для покращення пам’яті та енергії." 
                />
                <meta name="keywords" content="ноотропи, вітаміни, енергія, SuppHub, бади україна, купити амінокислоти, амінокислоти" />
                <meta property="og:title" content="SuppHub — Твій потенціал на максимум" />
                <meta property="og:description" content="Ноотропи та вітаміни для ефективного навчання та роботи." />
                <meta property="og:image" content="/logo-img.png" />

                <meta name="robots" content="noindex" />
            </Head>
            <StateContext.Provider value={states}>
                <ContactsMobilePopup />
                <BasketMobilePopup />
                <ContactsPopup />
                <BasketPopup />
                <Header isBasket={false} />
                <MainConfirmed />
                <Footer />
            </StateContext.Provider>
        </>
    )
}