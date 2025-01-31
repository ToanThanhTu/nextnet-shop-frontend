"use client";

import HeaderBottom from "@/app/components/header/header-bottom";
import HeaderTop from "@/app/components/header/header-top";
import Headroom from "react-headroom";

function Header() {
  return (
    <Headroom className="fixed top-0 z-50 w-full">
      <header className="bg-white">
        <HeaderTop />
        <HeaderBottom />
      </header>
    </Headroom>
  );
}

export default Header;
