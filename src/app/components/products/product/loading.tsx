import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

export default function Loading() {
  return (
    <div className="px-4 lg:px-40">
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <div className="bg-gray-200 animate-pulse h-4" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="bg-gray-200 animate-pulse h-4" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="bg-gray-200 animate-pulse h-4" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <div className="bg-gray-200 animate-pulse h-4" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="lg:grid grid-cols-2 gap-4">
        <div className="bg-gray-200 animate-pulse h-[600px] w-full" />
        <div className={cn("py-4 flex flex-col gap-4", "lg:py-0")}>
          <div className="bg-gray-200 animate-pulse h-4" />
          <div className="bg-gray-200 animate-pulse h-4" />
          <div className="bg-gray-200 animate-pulse h-4" />
          <div className="bg-gray-200 animate-pulse h-4" />
          <div className="bg-gray-200 animate-pulse h-4" />
          <div className="bg-gray-200 animate-pulse h-4" />
        </div>
      </div>
    </div>
  )
}
