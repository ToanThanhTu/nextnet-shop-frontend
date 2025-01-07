"use client";

import PaginationSection from "@/app/components/pagination/pagination";
import ProductCard from "@/app/components/products/product-card";
import { getProducts } from "@/app/requests";
import { Product } from "@/app/types";
import { setInitialFilter, setPage, updateCurrentFilter } from "@/lib/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface ProductsPageProps {
  endpoint: string;
  queryKey: string;
  category?: string;
  subcategory?: string;
}

function Products({ endpoint, queryKey, category, subcategory }: ProductsPageProps) {
  const dispatch = useAppDispatch();
  const { initial, current } = useAppSelector((state) => state.filter);

  const productsResult = useQuery({
    queryKey: [endpoint, queryKey, { current }],
    queryFn: async () => {
      const query = new URLSearchParams();

      if (category) query.set("category", category);
      if (subcategory) query.set("subcategory", subcategory);

      if (current) {
        query.set("priceMin", current.priceMin.toString());
        query.set("priceMax", current.priceMax.toString());
        query.set("sortBy", current.sortBy);
        query.set("limit", current.limit);
        query.set("page", current.page);
      }

      const { products, totalItems } = await getProducts(endpoint, query);

      // Calculate price range
      const prices = products.map((product: Product) => product.salePrice);
      const initialPriceMin = Math.min(...prices);
      const initialPriceMax = Math.max(...prices);

      return { products, totalItems, initialPriceMin, initialPriceMax };
    },
  });

  useEffect(() => {
    if (productsResult.data && initial.priceMin === 0 && initial.priceMax === 10000) {
      const { initialPriceMin, initialPriceMax } = productsResult.data;
      dispatch(setInitialFilter({ priceMin: initialPriceMin, priceMax: initialPriceMax }));
      dispatch(updateCurrentFilter({ priceMin: initialPriceMin, priceMax: initialPriceMax }));
    }
  }, [productsResult.data, initial, dispatch]);

  if (productsResult.isLoading) {
    return <div>Loading products...</div>;
  }

  const products: Product[] = productsResult.data?.products || [];

  const handlePageChange = (page: number) => {
    dispatch(setPage(page.toString()));
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="my-10">
        <PaginationSection
          totalItems={productsResult.data?.totalItems || 0}
          itemsPerPage={Number(current.limit)}
          currentPage={Number(current.page)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Products;
