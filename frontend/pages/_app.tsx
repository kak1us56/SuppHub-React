import { AppProps } from "next/app";
import "../styles/global.css";
import { Montserrat } from "next/font/google";

const montserrat: any = Montserrat({
  subsets: ["latin", "cyrillic"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Component {...pageProps} />
    </div>
  );
}
