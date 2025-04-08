import { Cards } from "./cards";
import { CatalogHeader } from "./catalog-header";

export function Catalog() {
  return (
    <div
      className="min-h-[1278px] max-md:min-h-[800px] bg-pill bg-[#1F1F1F] bg-repeat max-md:bg-[length:60px] bg-[length:250px]"
      id="catalog"
    >
      <div className="max-w-[1232px] max-md:max-w-[352px] mx-auto px-4">
        <CatalogHeader />
        <Cards />
      </div>
    </div>
  );
}
