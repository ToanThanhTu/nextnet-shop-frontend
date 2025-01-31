import Link from "next/link";

function AccountNav() {
  return (
    <nav className="flex justify-center items-center w-full space-x-2">
      <Link href="/account" className="account-nav-item">
        Profile
      </Link>
      <Link href="/account/orders" className="account-nav-item">
        Order History
      </Link>
    </nav>
  );
}

export default AccountNav;
