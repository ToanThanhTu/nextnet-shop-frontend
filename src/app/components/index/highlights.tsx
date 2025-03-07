import HighlightCard from "@/app/components/index/highlight-card";
import TopDealsCard from "@/app/components/index/top-deals-card";
import { highlights } from "@/app/data/hightlights";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function Highlights() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="px-4 lg:max-w-screen-lg xl:max-w-screen-xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <TopDealsCard />

        {highlights.map((highlight) => (
          <HighlightCard key={highlight.title} title={highlight.title} image={highlight.image} url={highlight.href} />
        ))}

        <Card className="md:hidden lg:block xl:hidden">
          <CardHeader>
            <CardTitle>Hey, I&apos;m Trevor</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/contact-me">
              <Image
                src="/trevor.png"
                alt="Trevor Photo"
                width={500}
                height={500}
              />
            </Link>
          </CardContent>
          <CardFooter>
            <Link href="/contact-me">Let&apos;s work together!</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Highlights;
