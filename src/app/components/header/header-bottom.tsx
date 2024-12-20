"use client";

import RandomQuotes from "@/app/components/index/random-quotes";
import { Input } from "@/app/components/ui/input";
import Menu from "@/app/components/menu/menu";
import PlaceIcon from "@mui/icons-material/Place";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";

function HeaderBottom() {
  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden lg:block bg-white">
        <div className="flex gap-6 justify-between items-center px-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={160}
              className="w-40"
            />
          </Link>

          <Menu />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input type="text" placeholder="Search" />
              <SearchIcon />
            </div>

            <PlaceIcon />
            <ShoppingCartIcon />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden p-4">
        <div className="flex justify-between items-center">
          <Sidebar />

          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={160}
              className="w-32"
            />
          </Link>

          <div className="flex gap-2">
            <PlaceIcon fontSize="large" />
            <ShoppingCartIcon fontSize="large" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Input type="text" placeholder="Search" />
          <SearchIcon />
        </div>
      </div>

      <RandomQuotes />
    </div>
  );
}

export default HeaderBottom;
