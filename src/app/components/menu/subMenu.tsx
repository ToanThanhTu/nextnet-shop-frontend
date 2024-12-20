"use client";

import { Category } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SubCategories } from "@/app/data/subCategories";

function SubMenu({ category }: { category: Category }) {
  const subCategories = SubCategories.filter(s => s.categoryId === category.id);

  return (
    <>
      {subCategories && (
        <div className="absolute top-32 -left-[50px] w-[800px] h-[400px] z-40 bg-white p-8 rounded-2xl">
          <div className="relative">
            <Link
              href={category.href}
              className="uppercase w-1/4 flex justify-between items-center border-b-2 pb-4"
            >
              <h3>{category.title}</h3>
              <p className="text-xs">View All</p>
            </Link>

            <ul>
              {subCategories.map((subCategory) => (
                <li
                  key={subCategory.title}
                  className="my-6 flex border-b-2 pb-4 w-1/4"
                >
                  <Link
                    href={subCategory.href}
                    className="hover:opacity-75 peer w-full flex justify-between items-center"
                  >
                    {subCategory.title}
                    <ArrowForwardIosIcon fontSize="small" />
                  </Link>

                  <Image
                    src="/generic-product-3x2.png"
                    alt={`${subCategory.title} image`}
                    width={900}
                    height={600}
                    className="hidden peer-hover:block absolute top-0 -right-0 w-[500px] z-50"
                  />
                </li>
              ))}
            </ul>

            <Image
              src={category.image}
              alt={`${category.title} Image`}
              width={900}
              height={600}
              className="absolute top-0 -right-0 w-[500px] z-40"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SubMenu;
