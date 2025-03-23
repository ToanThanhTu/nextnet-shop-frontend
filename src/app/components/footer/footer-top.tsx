"use client"

import Link from "next/link"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import { info } from "@/app/data/contact-me"
import Image from "next/image"
import { Mail, MapPin, Smartphone } from "lucide-react"
import { useGetCategoriesQuery } from "@/lib/features/api/apiSlice"
import Loading from "@/app/components/loading/loading"

function FooterTop() {
  const { data: categories = [], isLoading, isSuccess, isError, error } = useGetCategoriesQuery()

  let content: React.ReactNode

  if (isLoading) {
    content = <Loading />
  } else if (isSuccess) {
    content = (
      <>
        {categories.map((category) => (
          <li key={category.title}>
            <Link href={`/${category.slug}`} className="hover:cursor-pointer hover:underline">
              {category.title}
            </Link>
          </li>
        ))}
      </>
    )
  } else if (isError) {
    content = <div>Error: {error.toString()}</div>
  }

  return (
    <div className="bg-foreground text-background">
      <div className="w-full h-4 bg-primary" />

      <div className="flex flex-col gap-8 md:flex-row justify-between py-12 px-6 max-w-screen-xl m-auto">
        <div className="w-80">
          <Image src="/logo-white.png" alt="Logo" width={500} height={160} className="w-60" />
          <p className="mt-4">
            A Demo E-commerce Website built with Next.js, Tailwind CSS, ASP.NET and Azure.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>

          <ul className="grid grid-cols-2 gap-4">
            <li>
              <Link href="/bestsellers" className="hover:cursor-pointer hover:underline">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:cursor-pointer hover:underline">
                Today&apos;s Deals
              </Link>
            </li>
            <li>
              <Link href="/all-products" className="hover:cursor-pointer hover:underline">
                All Products
              </Link>
            </li>
            {content}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact Me</h3>

          <Link href={`tel:${info.phone}`} className="flex gap-2 mb-2 hover:cursor-pointer hover:underline">
            <Smartphone />
            <span>{info.phone}</span>
          </Link>

          <Link href={`mailto:${info.email}`} className="flex gap-2 mb-2 hover:cursor-pointer hover:underline">
            <Mail />
            <span>{info.email}</span>
          </Link>

          <Link href={info.linkedin} className="flex gap-2 mb-2 hover:cursor-pointer hover:underline">
            <LinkedInIcon />
            <span>LinkedIn</span>
          </Link>

          <Link href={info.github} className="flex gap-2 mb-2 hover:cursor-pointer hover:underline">
            <GitHubIcon />
            <span>GitHub</span>
          </Link>

          <div className="flex gap-2 mb-2">
            <MapPin />
            <p>{info.address}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTop
