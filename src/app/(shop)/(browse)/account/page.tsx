"use client";

import { useGetUserDetailsQuery } from "@/lib/features/api/apiSlice";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

function Account() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const signedInUser = localStorage.getItem("signedInNextNetShopUser");

    if (signedInUser) {
      const data = JSON.parse(signedInUser);
      dispatch(setCredentials(data));
    }
  }, [dispatch]);

  const {
    data: userDetails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserDetailsQuery(user?.id as number, {
    // perform a refetch every 15mins
    pollingInterval: 900_000,
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
