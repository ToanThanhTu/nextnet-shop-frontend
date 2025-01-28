import AccountNav from "@/app/components/account/account-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AccountNav />
      {children}
    </div>
  );
}
