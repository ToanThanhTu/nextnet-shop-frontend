"use client";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
// import { setCredentials } from "@/lib/features/auth/authSlice";
// import { useAppDispatch } from "@/lib/hooks";
// import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const signedInUser = localStorage.getItem("signedInNextNetShopUser");

  //   if (signedInUser) {
  //     const data = JSON.parse(signedInUser);
  //     dispatch(setCredentials(data));
  //   }
  // }, [dispatch]);

  return (
    <>
      <Header />
      <div className="mt-[170px]">{children}</div>
      <Footer />
    </>
  );
}
