"use client";

import FilterAndSort from "@/app/components/filter-and-sort";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const slug = pathName.split('/');

  let headerTitle = "";

  if (slug.length === 3) {
    headerTitle = slug[2].replace(/-/g, " ");
  } else if (slug.length === 2) {
    headerTitle = slug[1].replace(/-/g, " ");
  }

  return (
    <div className="mx-32">
      <div className="uppercase text-center">{headerTitle}</div>

      <div className="my-4">
        <FilterAndSort />
      </div>

      {children}
    </div>
  );
}
