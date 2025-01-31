"use client";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-48 lg:mt-40">{children}</div>
      <Footer />
    </>
  );
}
