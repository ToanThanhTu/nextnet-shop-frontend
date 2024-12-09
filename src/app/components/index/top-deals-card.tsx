import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { topDeals } from "@/app/data/hightlights";
import { CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function TopDealsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Deals</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {topDeals.map((deal) => (
          <div key={deal.title}>
              <Link href={deal.href}>
                <Image
                  src={deal.image}
                  alt={`${deal.title} image`}
                  width={500}
                  height={500}
                />
                <p>{deal.title} Limited time deal</p>
              </Link>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Link href="/deals">See all deals</Link>
      </CardFooter>
    </Card>
  );
}

export default TopDealsCard;
