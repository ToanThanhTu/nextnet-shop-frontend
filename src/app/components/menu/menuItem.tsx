"use client";

import { Category } from "@/app/types";
import SubMenu from "@/app/components/menu/subMenu";
import { MouseEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  category: Category;
  selectedMenu: number;
  toggleSubMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  closeSubMenu: () => void;
}

function MenuItem({ category, selectedMenu, toggleSubMenu, closeSubMenu }: Props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectedMenu === category.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedMenu, category.id]);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  return (
    <div>
      <button
        className={`font-bold text-sm uppercase border-b-4 hover:border-black py-10 flex items-center ${clsx(
          {
            "border-primary-dark text-primary-dark": selectedMenu === category.id,
            "border-transparent text-black": selectedMenu !== category.id,
          }
        )}`}
        value={category.id}
        onClick={toggleSubMenu}
      >
        {category.title}
        {selectedMenu === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {selectedMenu === category.id ? (
        <>
          <div
            className="fixed inset-0 top-[135px] h-screen bg-black bg-opacity-50 z-10"
            onClick={closeSubMenu}
          />
          <SubMenu category={category} closeSubMenu={closeSubMenu} />
        </>
      ) : null}
    </div>
  );
}

export default MenuItem;
