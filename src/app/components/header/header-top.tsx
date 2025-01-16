"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { logout, setCredentials } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

function HeaderTop() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const signedInUser = localStorage.getItem("signedInNextNetShopUser");

    if (signedInUser) {
      const data = JSON.parse(signedInUser);
      dispatch(setCredentials(data));
    }
  }, [dispatch]);

  return (
    <div className="flex justify-between gap-4 bg-black">
      <div>
        <div className="hidden md:flex gap-4 text-white text-sm ml-6 py-1">
          <Link href="/contact-me" className="hover:opacity-75">
            Contact Me
          </Link>
          <Link href="/track-my-order" className="hover:opacity-75">
            Track My Order
          </Link>
          <Link href="/gift-cards" className="hover:opacity-75">
            Gift Cards
          </Link>
        </div>
      </div>

      <DropdownMenu>
        {user ? (
          <>
            <DropdownMenuTrigger className="uppercase bg-[#84b082] text-sm font-bold flex items-center px-6 py-1">
              <div className="flex items-center gap-2">
                <span>Hello, {user.name}</span>
                <CircleUser />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
              <Link href="/account">
                <DropdownMenuItem className="bg-black uppercase text-white justify-center hover:opacity-75">
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href="/" onClick={() => dispatch(logout())}>
                <DropdownMenuItem className="uppercase justify-center hover:opacity-75">
                  Sign Out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </>
        ) : (
          <>
            <DropdownMenuTrigger className="uppercase bg-[#84b082] text-sm font-bold flex items-center px-6 py-1">
              <div>Sign in or Register</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
              <Link href="/signin">
                <DropdownMenuItem className="bg-black uppercase text-white justify-center hover:opacity-75">
                  Sign in
                </DropdownMenuItem>
              </Link>
              <Link href="/register">
                <DropdownMenuItem className="uppercase justify-center hover:opacity-75">
                  Register
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </>
        )}
      </DropdownMenu>
    </div>
  );
}

export default HeaderTop;
