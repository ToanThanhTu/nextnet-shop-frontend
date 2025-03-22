import { Card, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

function HighlightCard({ title, children }: PropsWithChildren<Props>) {
  return (
    <Card className="flex flex-col justify-between rounded-none shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
}

export default HighlightCard;
