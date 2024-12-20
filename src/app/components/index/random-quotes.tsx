import { quotes } from "@/app/data/quotes";
import Link from "next/link";
import { useEffect, useState } from "react";

function RandomQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * quotes.length));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/contact-me">
      <div className="w-full bg-gray-100 text-center hover:opacity-95">
        <p className="text-sm p-2 font-semibold">{quotes[index]}</p>
      </div>
    </Link>
  );
}

export default RandomQuotes;
