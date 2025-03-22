"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { logout } from "@/lib/features/auth/authSlice"
import { resetCartLocal } from "@/lib/features/cart/cartSlice"
import { useAppDispatch, useAuth } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { CircleUser } from "lucide-react"
import Link from "next/link"

function HeaderTop() {
  const user = useAuth({ needSignIn: false })
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(logout())
    dispatch(resetCartLocal())
  }

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
        <DropdownMenuTrigger
          className={cn(
            "uppercase bg-primary text-sm font-bold flex items-center px-6 py-1",
            "hover:cursor-pointer"
          )}
        >
          {user ? (
            <div className="flex items-center gap-2">
              <span>Hello, {user.name}</span>
              <CircleUser />
            </div>
          ) : (
            <div>Sign in or Register</div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn("w-48 rounded-none p-4 flex flex-col gap-2")}>
          <Link href={user ? "/account" : "/signin"}>
            <DropdownMenuItem className="bg-black uppercase text-white rounded-none justify-center hover:opacity-80">
              {user ? "Account" : "Sign in"}
            </DropdownMenuItem>
          </Link>
          <Link href={user ? "/" : "/register"} onClick={user ? handleSignOut : undefined}>
            <DropdownMenuItem className="uppercase justify-center hover:opacity-80">
              {user ? "Sign out" : "Register"}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default HeaderTop
