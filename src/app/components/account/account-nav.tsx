import Link from "next/link";

function AccountNav() {
  return (
    <nav className="flex justify-center items-center w-full space-y-4">
      <Link href="/account">Profile</Link>
      <Link href="/account/orders">Order History</Link>
    </nav>
  );
}

export default AccountNav;
