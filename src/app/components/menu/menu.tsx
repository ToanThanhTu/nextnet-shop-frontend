import MenuItem from "@/app/components/menu/menuItem";
import { getCategories } from "@/app/requests";
import { Category } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState, MouseEvent } from "react";

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const getCategoriesResult = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(JSON.parse(JSON.stringify(getCategoriesResult)));

  if (getCategoriesResult.isLoading) {
    return <div>loading data...</div>;
  }

  const categories: Category[] = getCategoriesResult.data;

  const toggleSubMenu = (event: MouseEvent): void => {
    event.preventDefault();
    if (selectedMenu === Number((event.target as HTMLButtonElement).value)) {
      setSelectedMenu(0);
    } else {
      setSelectedMenu(Number((event.target as HTMLButtonElement).value));
    }
  };

  const closeSubMenu = () => {
    setSelectedMenu(0);
  };

  return (
    <nav>
      <ul className="flex gap-4 items-center relative w-[700px]">
        <Link
          href="/best-sellers"
          className="uppercase font-bold text-sm border-b-4 border-transparent hover:border-black py-10"
        >
          Best Sellers
        </Link>

        <Link
          href="/all-deals"
          className="uppercase font-bold text-sm border-b-4 border-transparent hover:border-black py-10 flex items-center"
        >
          Today's Deals
        </Link>

        <Link
          href="/all-products"
          className="uppercase font-bold text-sm border-b-4 border-transparent hover:border-black py-10 flex items-center"
        >
          All Products
        </Link>

        {categories.map((category) => (
          <MenuItem
            key={category.title}
            category={category}
            selectedMenu={selectedMenu}
            toggleSubMenu={toggleSubMenu}
            closeSubMenu={closeSubMenu}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
