import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CheckoutHeader() {
  return (
    <div className="flex justify-between items-center">
      <Link href="/" className="uppercase text-sm">
        <ChevronLeft />
        Continue Shopping
      </Link>

      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={500} height={160} className="w-40" />
      </Link>

      <div></div>
    </div>
  );
}

export default CheckoutHeader;
