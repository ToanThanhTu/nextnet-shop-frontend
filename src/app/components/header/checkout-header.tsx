import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CheckoutHeader() {
  return (
    <header className="flex justify-between items-center px-2 lg:px-64 py-6 fixed top-0 left-0 w-full bg-white z-50">
      <Link href="/all-products" className="uppercase text-xs lg:text-sm flex items-center hover:underline">
        <ChevronLeft />
        Continue Shopping
      </Link>

      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={500} height={160} className="w-28 lg:w-48" />
      </Link>

      <div className="w-40 hidden lg:block"></div>
    </header>
  );
}

export default CheckoutHeader;
