"use client";

import Loading from "@/app/components/products/recommendations/loading";
import RecommendationsCarousel from "@/app/components/products/recommendations/recommendations-carousel";
import { useGetProductsRecommendationsQuery } from "@/lib/features/products/productsSlice";

function Recommendations({ productId }: { productId: number }) {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsRecommendationsQuery(productId);

  let content: React.ReactNode;

  if (isLoading) {
    content = <Loading />;
  } else if (isError || !products || products.length === 0) {
    content = <div className="text-center">Sorry, no recommendations for now</div>;
  } else if (isSuccess) {
    content = <RecommendationsCarousel products={products} />;
  }

  return (
    <div className="py-12">
      <h2 className="text-center py-12">You may also like</h2>
      {content}
    </div>
  );
}

export default Recommendations;
