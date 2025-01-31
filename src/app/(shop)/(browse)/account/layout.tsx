import AccountNav from "@/app/components/account/account-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-5 px-4 lg:px-80">
      <AccountNav />
      {children}
    </div>
  );
}
