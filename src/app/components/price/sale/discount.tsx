import { cn } from "@/lib/utils";

export default function Discount({ sale, className }: { sale: number, className?: string }) {
  return <p className={cn("py-1 px-2 bg-primary text-primary-foreground", className)}>{sale}% OFF</p>
}
