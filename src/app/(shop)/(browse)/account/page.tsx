"use client";

import { useGetUserDetailsQuery } from "@/lib/features/api/apiSlice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

function Account() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    router.push("/login");
    return;
  }

  const {
    data: userDetails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserDetailsQuery(user.id, {
    // perform a refetch every 15mins
    pollingInterval: 900_000,
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

  return (
    <div>
      {content}
    </div>
  );
}

export default Account;
