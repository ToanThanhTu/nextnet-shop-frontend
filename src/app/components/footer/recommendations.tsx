"use client";

import Loading from "@/app/components/products/recommendations/loading";
import RecommendationsCarousel from "@/app/components/products/recommendations/recommendations-carousel";
import { useGetPersonalRecommendationsQuery } from "@/lib/features/products/productsSlice";
import { useAuth } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";

function PersonalisedRecommendations() {
  const user = useAuth({ needSignIn: false });

  const {
    data: personalRecommendations,
    isLoading,
    isSuccess,
    isError,
  } = useGetPersonalRecommendationsQuery(user ? user.id : -1);

  let content: React.ReactNode;

  if (isLoading) {
    content = <Loading />;
  } else if (isError || !personalRecommendations || personalRecommendations.length === 0) {
    content = <div className="text-center text-lg font-medium">Sorry, no recommendations for now</div>;
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
        <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
          <h3 className="text-2xl font-semibold">See personalised recommendations</h3>
          <Link href="/login" className={cn("py-2 px-6 bg-primary text-primary-foreground rounded-lg uppercase", "hover:opacity-80")}>
            Sign in
          </Link>
          <p className="text-base">
            New customer? <Link href="/register" className="underline hover:opacity-80">Start here</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default PersonalisedRecommendations;
