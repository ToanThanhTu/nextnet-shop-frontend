"use client";

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
    content = <div>Loading your profile...</div>;
  } else if (isSuccess) {
    content = (
      <div>
        <h1>{userDetails.name} Account</h1>
        <h2>User ID: {userDetails.id}</h2>
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
