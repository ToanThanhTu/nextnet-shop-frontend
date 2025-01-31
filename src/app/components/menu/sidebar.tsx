"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useGetCategoriesQuery } from "@/lib/features/api/apiSlice";
import { Menu } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories = [], isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>loading categories...</div>;
  } else if (isSuccess) {
    content = (
      <>
        {categories.map((category) => (
          <li key={category.title} className="py-4 border-t-2 border-primary-dark">
            <h3 className="py-2 px-4">
              <Link href={`/${category.slug}`} onClick={() => setIsOpen(false)}>
                {category.title}
              </Link>
            </h3>
          </li>
        ))}
      </>
    );
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <Menu size={32} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div
          className="fixed top-0 bg-black bg-opacity-50 h-screen w-screen z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`flex fixed top-0 left-0 h-screen transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="w-[300px] h-full bg-white overflow-y-auto">
          <div className="pt-16 pb-6 bg-primary-dark text-white tracking-wide px-4">
            <h3>Browse</h3>
            <h3 className="font-semibold">Next Net Shop</h3>
          </div>

          <ul>
            <li className="py-8">
              <h3 className="px-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Next Net Home
                </Link>
              </h3>
            </li>

            <li className="py-4 border-t-2 border-primary-dark">
              <h3 className="py-2 px-4">
                <Link href="/all-products" onClick={() => setIsOpen(false)}>
                  All Products
                </Link>
              </h3>
            </li>

            <li className="py-4 border-t-2 border-primary-dark">
              <h3 className="py-2 px-4">
                <Link href="/best-sellers" onClick={() => setIsOpen(false)}>
                  Best Sellers
                </Link>
              </h3>
            </li>

            <li className="py-4 border-t-2 border-primary-dark">
              <h3 className="py-2 px-4">
                <Link href="/all-deals" onClick={() => setIsOpen(false)}>
                  Today's Deals
                </Link>
              </h3>
            </li>

            {content}

            <div className="pt-4 pb-12 border-t-2 border-primary-dark">
              <li className="py-2 px-4">
                <Link href="/track-my-order" onClick={() => setIsOpen(false)}>
                  Track My Order
                </Link>
              </li>

              <li className="py-2 px-4">
                <Link href="/gift-cards" onClick={() => setIsOpen(false)}>
                  Gift Cards
                </Link>
              </li>

              <li className="py-2 px-4">
                <Link href="/contact-me" onClick={() => setIsOpen(false)}>
                  Contact Me
                </Link>
              </li>
            </div>
          </ul>
        </div>

        <Button variant="outline" onClick={() => setIsOpen(false)} className="m-4">
          X
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
