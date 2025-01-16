"use client";

import Filter from "@/app/components/filter-and-sort/filter";
import FilterTags from "@/app/components/filter-and-sort/filter-tags";
import { resetToInitial } from "@/lib/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/hooks";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  const pathName = usePathname();
  const slug = pathName.split("/");

  let headerTitle = "";

  if (slug.length === 3) {
    headerTitle = slug[2].replace(/-/g, " ");
  } else if (slug.length === 2) {
    headerTitle = slug[1].replace(/-/g, " ");
  }

  dispatch(resetToInitial());

  return (
    <div className="mx-32">
      <h1 className="uppercase text-center">{headerTitle}</h1>

      <section className="flex justify-between items-center my-4">
        <FilterTags />
        <Filter />
      </section>

      {children}
    </div>
  );
}
