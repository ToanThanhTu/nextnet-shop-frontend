"use client";

import Loading from "@/app/(shop)/(browse)/account/loading";
import { useGetUserDetailsQuery } from "@/lib/features/api/apiSlice";
import { useAuth } from "@/lib/hooks";

function Account() {
  const user = useAuth({ needSignIn: true });

  const {
    data: userDetails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserDetailsQuery(user?.id as number, {
    skip: !user,
  });

  let content: React.ReactNode;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="space-y-2 py-4 text-center">
        <h2>{userDetails.name} Account</h2>
        <h3>User ID: {userDetails.id}</h3>
        <p>Email: {userDetails.email}</p>
        <p>Role: {userDetails.role}</p>
      </div>
    );
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>;
  }

  return <div>{content}</div>;
}

export default Account;
