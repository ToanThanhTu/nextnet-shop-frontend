"use client"

import useMediaQuery from "@/hooks/useMediaQuery"

export default function Loading() {
  const isMd = useMediaQuery("md")

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:max-w-5xl m-auto">
      {Array.from({ length: isMd ? 4 : 2 }).map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-200 h-[200px]"></div>
      ))}
    </div>
  )
}