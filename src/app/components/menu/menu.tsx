import MenuItem from "@/app/components/menu/menuItem";
import { categories } from "@/app/data/categories";
import StoreProvider from "@/app/StoreProvider";
import Link from "next/link";

function Menu() {
  return (
    <nav>
      <ul className="flex gap-4 items-center relative w-[700px]">
        <Link
          href="/bestsellers"
          className="uppercase font-bold text-xs border-b-4 border-transparent hover:border-black py-6"
        >
          Best Sellers
        </Link>

        <Link
          href="/deals"
          className="uppercase font-bold text-xs border-b-4 border-transparent hover:border-black py-6 flex items-center"
        >
          Today's Deals
        </Link>

        <Link
          href="/all-products"
          className="uppercase font-bold text-xs border-b-4 border-transparent hover:border-black py-6 flex items-center"
        >
          All Products
        </Link>

        <StoreProvider>
          {categories.map((category) => (
            <MenuItem key={category.title} category={category} />
          ))}
        </StoreProvider>
      </ul>
    </nav>
  );
}

export default Menu;
