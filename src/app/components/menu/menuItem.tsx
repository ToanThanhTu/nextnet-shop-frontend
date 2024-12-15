"use client";

import { Category } from "@/app/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SubMenu from "@/app/components/menu/subMenu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { MouseEvent } from "react";
import { setMenuSelect } from "@/lib/features/menu/menuSelectSlice";
import clsx from "clsx";

function MenuItem({ category }: { category: Category }) {
  const selectedMenu = useAppSelector((state) => state.menuSelect.selectedMenu);
  const dispatch = useAppDispatch();

  const toggleSubMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (selectedMenu === (event.target as HTMLButtonElement).value) {
      dispatch(setMenuSelect(""));
    } else {
      dispatch(setMenuSelect((event.target as HTMLButtonElement).value));
    }
  };

  return (
    <div>
      <button
        className={`font-bold text-xs uppercase border-b-4 hover:border-black py-5 flex items-center ${clsx(
          {
            "border-primary-dark text-primary-dark":
              selectedMenu === category.id,
            "border-transparent text-black": selectedMenu !== category.id,
          }
        )}`}
        value={category.id}
        onClick={toggleSubMenu}
      >
        {category.id}
        {selectedMenu === category.id ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </button>

      {selectedMenu === category.id ? (
        <>
          <div
            className="fixed inset-0 top-[120px] bg-black bg-opacity-50 z-10"
            onClick={() => dispatch(setMenuSelect(""))}
          />
          <SubMenu category={category} />
        </>
      ) : null}
    </div>
  );
}

export default MenuItem;
