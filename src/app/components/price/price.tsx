import { cn } from "@/lib/utils"

interface Props {
  price: number
  variant?: "onSale" | "org" | "strikethrough"
  className?: string
}

export default function Price({ price, variant, className }: Props) {
  if (variant === "onSale") {
    return <span className={cn("py-1 text-destructive text-xl", className)}>${price}</span>
  }

  if (variant === "strikethrough") {
    return <span className={cn("py-1 px-2 text-foreground line-through", className)}>was ${price}</span>
  }

  if (variant === "org") {
    return <span className={cn("py-1 px-2 text-foreground text-xl", className)}>${price}</span>
  }

  return null
}
