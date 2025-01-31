"use client";

import RecommendationsCarousel from "@/app/components/products/recommendations-carousel";
import { useGetPersonalRecommendationsQuery } from "@/lib/features/products/productsSlice";
import { useAuth } from "@/lib/hooks";
import Link from "next/link";

function PersonalisedRecommendations() {
  const user = useAuth({ needSignIn: false });

  const {
    data: personalRecommendations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPersonalRecommendationsQuery(user ? user.id : -1);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div className="text-center">Loading recommendations...</div>;
  } else if (isError || !personalRecommendations || personalRecommendations.length === 0) {
    content = <div className="text-center">Sorry, no recommendations for now</div>;
  } else if (isSuccess) {
    content = <RecommendationsCarousel products={personalRecommendations} />;;
  }

  return (
    <div>
      {user ? (
        <div className="py-12 text-center">
          <h3 className="py-12">Recommended Products For You</h3>
          {content}
        </div>
      ) : (
        <div className="py-12 text-center">
          <h3>See personalised recommendations</h3>
          <Link href="/login" className="button mt-4 mb-2">
            Sign in
          </Link>
          <p className="text-sm">
            New customer? <Link href="/register" className="underline">Start here.</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default PersonalisedRecommendations;
