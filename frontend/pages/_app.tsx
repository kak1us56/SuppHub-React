import { AppProps } from "next/app";
import "../styles/global.css";
import { Montserrat } from "next/font/google";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

const montserrat: any = Montserrat({
  subsets: ["latin", "cyrillic"],
});


// Fix lint error for typeScript and Google Analytics
declare global {
  interface Window {
    gtag(
      command: 'config' | 'js',
      gaIdOrDate: string | Date,
      options?: { page_path: string }
    ): void;
    
    gtag(
      command: 'event',
      action: string,
      params?: object
    ): void;
    dataLayer: any[];
  }
}

// Google Analytics ID from environment variables
const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
      page_path: url,
    });
  }
};


export default function App({ Component, pageProps }: AppProps) {
  // Настройка Google Analytics
  const router = useRouter();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (gaId) {
        pageview(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, gaId]);

  return (
    <>
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <div className={montserrat.className}>
        <Component {...pageProps} />
      </div>    
    </>

  );
}
