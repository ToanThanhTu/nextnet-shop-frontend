"use client";

import PaginationSection from "@/app/components/pagination/pagination";
import ProductCard from "@/app/components/products/product-card";
import { Product } from "@/app/types";
import { setInitialFilter, setPage, updateCurrentFilter } from "@/lib/features/filter/filterSlice";
import { useGetProductsQuery } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

interface ProductsPageProps {
  endpoint: string;
  category?: string;
  subcategory?: string;
}

function Products({ endpoint, category, subcategory }: ProductsPageProps) {
  const dispatch = useAppDispatch();
  const { initial, current } = useAppSelector((state) => state.filter);

  const params = {
    category,
    subcategory,
    priceMin: current.priceMin,
    priceMax: current.priceMax,
    sortBy: current.sortBy,
    limit: current.limit,
    page: current.page,
  };

  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery({ endpoint, params });

  useEffect(() => {
    if (isSuccess && initial.priceMin === 0 && initial.priceMax === 10000) {
      // Calculate filter price range
      const prices = data.products.map((product: Product) => product.salePrice);
      const initialPriceMin = Math.min(...prices);
      const initialPriceMax = Math.max(...prices);

      dispatch(
        setInitialFilter({
          priceMin: initialPriceMin,
          priceMax: initialPriceMax,
          sortBy: "none",
          limit: "12",
          page: "1",
        })
      );
      dispatch(updateCurrentFilter({ priceMin: initialPriceMin, priceMax: initialPriceMax }));
    }
  }, [data, initial, isSuccess, dispatch]);

  let content: React.ReactNode;

  const handlePageChange = (page: number) => {
    dispatch(setPage(page.toString()));
  };

  if (isLoading) {
    content = <div>Loading products...</div>;
  } else if (isSuccess) {
    content = (
      <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="my-10">
          <PaginationSection
            totalItems={data.totalItems || 0}
            itemsPerPage={Number(current.limit)}
            currentPage={Number(current.page)}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  }

  return <div>{content}</div>;
}

export default Products;
