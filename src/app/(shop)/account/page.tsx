"use client";

import { useGetUserDetailsQuery } from "@/lib/features/api/apiSlice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

function Account() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    router.push('/login');
    return
  }

  const { data, isFetching } = useGetUserDetailsQuery(user.id, {
    // perform a refetch every 15mins
    pollingInterval: 900_000,
  });

  console.log("useGetUserDetailsQuery data: ", data);

  if (isFetching) {
    return <div>Loading your profile...</div>
  }

  return (
    <div>
      <h1>{user.name} Account</h1>
      <h2>User ID: {user.id}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default Account;