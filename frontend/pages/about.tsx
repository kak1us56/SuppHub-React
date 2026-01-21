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
