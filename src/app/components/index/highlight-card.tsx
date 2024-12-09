import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Highlight } from "@/app/types";
import { CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{highlight.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={highlight.href}>
          <Image
            src={highlight.image}
            alt={`${highlight.title} image`}
            width={500}
            height={500}
          />
        </Link>
      </CardContent>
      <CardFooter>
        <Link href={highlight.href}>Shop now</Link>
      </CardFooter>
    </Card>
  );
}

export default HighlightCard;
