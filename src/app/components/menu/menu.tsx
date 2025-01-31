import MenuItem from "@/app/components/menu/menuItem";
import { useGetCategoriesQuery } from "@/lib/features/api/apiSlice";
import Link from "next/link";
import { useState, MouseEvent } from "react";

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const { data: categories, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

  let content: React.ReactNode;

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

  if (isLoading) {
    content = <div>Loading menu...</div>;
  } else if (isSuccess) {
    content = (
      <>
        {categories.map((category) => (
          <MenuItem
            key={category.title}
            category={category}
            selectedMenu={selectedMenu}
            toggleSubMenu={toggleSubMenu}
            closeSubMenu={closeSubMenu}
          />
        ))}
      </>
    );
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  }

  return (
    <nav>
      <ul className="flex gap-4 items-center relative w-[700px]">
        <Link
          href="/best-sellers"
          className="uppercase font-bold text-sm border-b-4 border-transparent hover:border-black py-10"
          onClick={closeSubMenu}
        >
          Best Sellers
        </Link>

        <Link
          href="/all-deals"
          className="uppercase font-bold text-sm border-b-4 border-transparent hover:border-black py-10 flex items-center"
          onClick={closeSubMenu}
        >
          Today's Deals
        </Link>

        <Link
          href="/all-products"
          className="uppercase font-bold text-sm border-b-4 border-transparent hover:border-black py-10 flex items-center"
          onClick={closeSubMenu}
        >
          All Products
        </Link>

        {content}
      </ul>
    </nav>
  );
}

export default Menu;
