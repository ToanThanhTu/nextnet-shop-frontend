"use client";

import { useAuth } from "@/lib/hooks";
import Link from "next/link";

function PersonalisedRecommendations() {
  const user = useAuth({ needSignIn: false });

  return (
    <div>
      {user ? (
        <div className="py-12 text-center">
          <h2>Recommended Products For You</h2>
          <p>Blah</p>
        </div>
      ) : (
        <div className="py-12 text-center">
          <h2>See personalised recommendations</h2>
          <Link href="/login" className="button mt-4 mb-2">
            Sign in
          </Link>
          <p className="text-sm">
            New customer? <Link href="/register">Start here.</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default PersonalisedRecommendations;
