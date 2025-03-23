"use client"

import RandomQuotes from "@/app/components/index/random-quotes"
import Menu from "@/app/components/menu/menu"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "@/app/components/menu/sidebar"
import { MapPin, X } from "lucide-react"
import SearchBar from "@/app/components/search-bar/search-bar"
import Cart from "@/app/components/cart/cart"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"

function HeaderBottom() {
  const [searchBarFocus, setSearchBarFocus] = useState(false)

  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden lg:block bg-white">
        <div className="flex gap-6 justify-between items-center px-6">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={500} height={160} className="w-40" />
          </Link>

          {searchBarFocus ? (
            <div className="flex grow items-center gap-4 h-26">
              <SearchBar searchBarFocus={searchBarFocus} setSearchBarFocus={setSearchBarFocus} />
              <Button variant="ghost" onClick={() => setSearchBarFocus(false)}>
                <X color="black" />
              </Button>
            </div>
          ) : (
            <>
              <Menu />

              <div className="flex items-center gap-4">
                <SearchBar searchBarFocus={searchBarFocus} setSearchBarFocus={setSearchBarFocus} />
                <MapPin />
                <Cart />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Sidebar />

          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={500} height={160} className="w-32" />
          </Link>

          <div className="flex gap-2 items-center">
            <MapPin fontSize="large" />
            <Cart />
          </div>
        </div>

        <SearchBar searchBarFocus={searchBarFocus} setSearchBarFocus={setSearchBarFocus} />
      </div>

      <RandomQuotes />

      {searchBarFocus && (
        <div
          className={cn(
            "fixed inset-0 top-[152px] h-screen bg-black opacity-80 z-20",
            "lg:top-[132px]"
          )}
          onClick={() => setSearchBarFocus(false)}
        />
      )}
    </div>
  )
}

export default HeaderBottom
