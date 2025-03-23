import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

function HighlightCard({ title, children }: PropsWithChildren<Props>) {
  return (
    <Card className="flex flex-col justify-between gap-2 rounded-none shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
}

export default HighlightCard;
