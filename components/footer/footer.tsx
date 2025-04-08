import { LogoBlock } from "./logo-block";
import { Menu } from "./menu";
import { Socials } from "./socials";

export function Footer() {
  return (
    <footer>
      <div className="bg-black min-h-[172px] max-md:min-h-[80px]">
        <div className="max-w-[1232px] mx-auto px-4 max-md:max-w-[352px]">
          <div className="max-md:pt-2 pt-[40px] flex justify-between items-center">
            <LogoBlock />
            <Menu />
            <Socials />
          </div>
          <p className="text-white max-md:tracking-[1px] max-md:pb-2 max-md:text-[0.5rem] text-center leading-cssnormal text-[1.125rem] tracking-[1.08px] font-medium">
            © SuppHub 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
