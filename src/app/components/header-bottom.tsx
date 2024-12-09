"use client";

import RandomQuotes from "@/app/components/index/random-quotes";
import { Input } from "@/app/components/ui/input";
import Menu from "@/app/components/ui/menu";
import PlaceIcon from "@mui/icons-material/Place";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";

function HeaderBottom() {
  return (
    <div>
      <div className="p-6">
        <div className="flex gap-6 justify-between items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={160}
            className="w-32"
          />

          <Menu />

          <div className="flex items-center gap-4">
            <Input type="text" placeholder="Search" />
            <PlaceIcon />
            <ShoppingCartIcon />
          </div>
        </div>
      </div>
      
      <RandomQuotes />
    </div>
  );
}

export default HeaderBottom;
