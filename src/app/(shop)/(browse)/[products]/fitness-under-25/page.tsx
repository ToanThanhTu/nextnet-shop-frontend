"use client";

import Products from "@/app/components/products/products";
import { updateCurrentFilter } from "@/lib/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/hooks";

function Page() {
  const dispatch = useAppDispatch();
  dispatch(updateCurrentFilter({ priceMax: 25 }));

  return <Products endpoint="all" category="fitness" />;
}

export default Page;
