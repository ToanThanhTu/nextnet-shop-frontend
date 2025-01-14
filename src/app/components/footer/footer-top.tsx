"use client";

import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { info } from "@/app/data/contact-me";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/requests";
import { Category } from "@/app/types";
import { Mail, MapPin, Smartphone } from "lucide-react";

function FooterTop() {
  const getCategoriesResult = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(JSON.parse(JSON.stringify(getCategoriesResult)));

  if (getCategoriesResult.isLoading) {
    return <div>loading data...</div>;
  }

  const categories: Category[] = getCategoriesResult.data;

  return (
    <div className="bg-footer">
      <div className="w-full h-4 bg-primary" />

      <div className="flex flex-col gap-8 md:flex-row justify-between py-12 px-6 max-w-screen-xl m-auto">
        <div className="w-80">
          <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={160}
            className="w-60"
          />
          <p className="mt-4">
            A Demo E-commerce Website built with Next.js, Tailwind CSS, ASP.NET
            and Azure.
          </p>
        </div>

        <div>
          <h3 className="mb-4">Quick Links</h3>

          <ul className="grid grid-cols-2 gap-4">
            <li>
              <Link href="/bestsellers">Best Sellers</Link>
            </li>
            <li>
              <Link href="/deals">Today's Deals</Link>
            </li>
            <li>
              <Link href="/all-products">All Products</Link>
            </li>
            {categories.map((category) => (
              <li key={category.title}>
                <Link href={`/${category.slug}`}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4">Contact Me</h3>

          <div className="flex gap-2 mb-2">
            <Smartphone />
            <Link href={`tel:${info.phone}`}>{info.phone}</Link>
          </div>

          <div className="flex gap-2 mb-2">
            <Mail />
            <Link href={`mailto:${info.email}`}>{info.email}</Link>
          </div>

          <div className="flex gap-2 mb-2">
            <LinkedInIcon />
            <Link href={info.linkedin}>LinkedIn</Link>
          </div>

          <div className="flex gap-2 mb-2">
            <GitHubIcon />
            <Link href={info.github}>GitHub</Link>
          </div>

          <div className="flex gap-2 mb-2">
            <MapPin />
            <p>{info.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
