import Filter from "@/app/components/filter/filter";
import Sort from "@/app/components/sort";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Filter />

      <div className="col-span-3">
        <Sort />
        {children}
      </div>
    </div>
  );
}
