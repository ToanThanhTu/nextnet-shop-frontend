import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CheckoutHeader() {
  return (
    <header className="flex justify-between items-center px-64 py-6 fixed top-0 left-0 w-full bg-white z-50">
      <Link href="/all-products" className="uppercase text-sm flex items-center gap-2 hover:underline">
        <ChevronLeft />
        Continue Shopping
      </Link>

      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={500} height={160} className="w-48" />
      </Link>

      <div className="w-40"></div>
    </header>
  );
}

export default CheckoutHeader;
