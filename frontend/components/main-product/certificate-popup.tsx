import { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect } from "react";
import { CrossIcon } from "../uikit/images/cross";

interface CertificatePopupProps {
    isCertificatePopupOpen: boolean;
    setIsCertificatePopupOpen: (active: boolean) => void;
    certificate: StaticImageData;
    name: string;
}

export const CertificatePopup: React.FC<CertificatePopupProps> = ({ isCertificatePopupOpen, setIsCertificatePopupOpen, certificate, name }) => {
    useEffect(() => {
        if (isCertificatePopupOpen) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-y-hidden");
        };
    }, [isCertificatePopupOpen]);

    return (
        <div 
            className={`${isCertificatePopupOpen ? "opacity-1 visible" : "opacity-0 invisible"} fixed w-full h-full bg-[rgba(0,_0,_0,_0.8)] top-0 left-0 z-10 popup-transition`}
            onClick={(e) => {
                const target = e.target as Element;
                if (!target.closest("[data-id=modal]")) {
                    setIsCertificatePopupOpen(false);
                }
            }} >
            <div className="min-h-full flex justify-center items-center py-[30px] px-[10px] popup-transition">
                <div 
                    className={`${isCertificatePopupOpen ? "opacity-1 visible" : "opacity-0 invisible"} relative popup-transition md:h-[90vh]`}
                    data-id="modal">
                    <div 
                        className="absolute top-3 right-3"
                        onClick={() => setIsCertificatePopupOpen(false)}>
                        <CrossIcon />
                    </div>
                    <Image src={certificate} alt={`Сертифікат на ${name}`} className="md:h-[90vh]" />
                </div>
            </div>
        </div>
    )
}