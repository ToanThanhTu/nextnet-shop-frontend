import { cn } from "@/lib/utils";

export default function LoadingTopDeals() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={cn("bg-gray-200 animate-pulse h-[140px] w-[140px]", "lg:h-[130px] lg:w-[130px]", "xl:h-[120px] xl:w-[120px]")} />
      ))}
    </>
  )
}
