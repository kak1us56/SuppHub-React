import { Handjet } from "next/font/google";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export function BgImg() {
  return (
    <div className="min-h-[680px] max-sm:min-h-[220px] max-sm:pt-[48px] bg-bg-img bg-no-repeat bg-cover bg-center">
      <div className="max-w-[1232px] max-sm:max-w-[352px] mx-auto px-4 min-h-[680px] max-sm:min-h-[220px] flex items-center justify-center">
        <h2 className={`text-[56px] max-sm:text-[30px] max-sm:tracking-[4.6px] text-black text-center ${handjet.className} font-semibold tracking-[6.2px] leading-cssnormal`}>
          Енергія для розуму<br />в кожній капсулі
        </h2>
      </div>

    </div>
  );
}
