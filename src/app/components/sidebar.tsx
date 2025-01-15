"use client";

import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useGetCategoriesQuery } from "@/lib/features/api/apiSlice";

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
          <li key={category.title} className="py-4 border-t-4 border-primary-dark">
            <h3 className="py-2 px-4">
              <Link href={`/${category.slug}`}>{category.title}</Link>
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
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="focus:outline-none"
      >
        <MenuIcon fontSize="large" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`flex fixed top-0 left-0 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
        aria-hidden={!isOpen}
      >
        <div className="w-[300px] h-full bg-white overflow-y-auto">
          <div className="pt-16 pb-6 bg-primary-dark text-white tracking-wide px-4">
            <h3>Browse</h3>
            <h3 className="font-semibold">Next Net Shop</h3>
          </div>

          <ul>
            <li className="py-8">
              <h3 className="px-4">
                <Link href="/">Next Net Home</Link>
              </h3>
            </li>

            {content}

            <div className="pt-4 pb-12 border-t-4 border-primary-dark">
              <li className="py-2 px-4">
                <Link href="/track-my-order">Track My Order</Link>
              </li>

              <li className="py-2 px-4">
                <Link href="/gift-cards">Gift Cards</Link>
              </li>

              <li className="py-2 px-4">
                <Link href="/contact-me">Contact Me</Link>
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
