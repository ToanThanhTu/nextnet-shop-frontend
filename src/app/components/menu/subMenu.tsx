"use client";

import { Category } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  category: Category;
  closeSubMenu: () => void;
}

function SubMenu({ category, closeSubMenu }: Props) {
  return (
    <>
      <div className="absolute top-32 -left-[50px] w-[800px] h-[400px] z-40 bg-white p-8 rounded-2xl">
        <div className="relative">
          <Link
            href={`/${category.slug}`}
            className="uppercase w-1/4 flex justify-between items-center border-b-2 pb-4 hover:opacity-80"
            onClick={closeSubMenu}
          >
            <h3 className="font-bold">{category.title}</h3>
            <p className="text-xs">View All</p>
          </Link>

          <ul>
            {category.subCategories?.map((subCategory) => (
              <li
                key={subCategory.title}
                className="my-6 flex border-b-2 pb-4 w-1/4"
              >
                <Link
                  href={`/${category.slug}/${subCategory.slug}`}
                  className="hover:opacity-75 peer w-full flex justify-between items-center"
                  onClick={closeSubMenu}
                >
                  {subCategory.title}
                  <ChevronRight fontSize="small" />
                </Link>

                <Image
                  src={`/subcategory-images/${subCategory.slug}.webp`}
                  alt={`${subCategory.title} image`}
                  width={900}
                  height={600}
                  className="hidden peer-hover:block absolute top-0 -right-0 w-[500px] z-50"
                />
              </li>
            ))}
          </ul>

          <Image
            src={`/category-images/${category.slug}.webp`}
            alt={`${category.title} Image`}
            width={900}
            height={600}
            className="absolute top-0 -right-0 w-[500px] z-40"
          />
        </div>
      </div>
    </>
  );
}

export default SubMenu;
