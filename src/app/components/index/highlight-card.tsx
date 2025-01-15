import { Card, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function HighlightCard({ title, image, url }: { title: string; image: string; url: string }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={url}>
          <Image src={image} alt={`${title} image`} width={500} height={500} />
        </Link>
      </CardContent>
      <CardFooter>
        <Link href={url}>Shop now</Link>
      </CardFooter>
    </Card>
  );
}

export default HighlightCard;
