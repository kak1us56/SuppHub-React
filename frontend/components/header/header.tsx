import { HeaderLogo } from "./header-logo";
import { HeaderMenu } from "./header-menu";

interface HeaderProps {
  isBasket: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isBasket }) => {
  return (
    <header className="bg-black min-h-20 max-sm:min-h-[48px] fixed w-full z-[9] top-0 left-0">
      <div className="max-w-[1232px] max-sm:max-w-[352px] max-sm:min-h-[48px] min-h-20 mx-auto px-4 flex items-center justify-between">
        <HeaderLogo />
        <HeaderMenu isBasket={isBasket} />
      </div>
    </header>
  );
}
