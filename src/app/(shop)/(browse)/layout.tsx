import Filter from "@/app/components/filter/filter";
import Sort from "@/app/components/sort";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Filter />
      <Sort />
      {children}
    </div>
  );
}
