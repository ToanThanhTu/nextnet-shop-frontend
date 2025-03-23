import Link from "next/link";

function AccountNav() {
  return (
    <nav className="flex justify-center items-center w-full space-x-2">
      <Link href="/account" className="hover:underline hover:opacity-80">
        Profile
      </Link>

      <p>|</p>

      <Link href="/account/orders" className="hover:underline hover:opacity-80">
        Order History
      </Link>
    </nav>
  );
}

export default AccountNav;
