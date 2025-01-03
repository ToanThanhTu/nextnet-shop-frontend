"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollTopButton() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed sm:bottom-20 sm:right-20 bottom-10 right-10 p-2 rounded-full bg-black text-white ${
        scroll > 100 ? "block" : "hidden"
      }`}
    >
      <ChevronUp />
    </button>
  );
}

export default ScrollTopButton;
