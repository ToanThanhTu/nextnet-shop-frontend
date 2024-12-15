import { Category, SubCategory } from "@/app/types";

export const categories: Category[] = [
  {
    id: "1",
    title: "Home",
    href: "/home",
    image: "/generic-product.png",
  },
  {
    id: "2",
    title: "Electronics",
    href: "/electronics",
    image: "/generic-product.png",
  },
  {
    id: "3",
    title: "Fitness",
    href: "/fitness",
    image: "/generic-product.png",
  },
];

export const SubCategories: SubCategory[] = [
  {
    id: "1",
    title: "Bedding",
    href: "/home/bedding",
    image: "/generic-product.png",
    categoryId: "1",
  },
  {
    id: "2",
    title: "Living",
    href: "/home/living",
    image: "/generic-product.png",
    categoryId: "1",
  },
  {
    id: "3",
    title: "Kitchen",
    href: "/home/kitchen",
    image: "/generic-product.png",
    categoryId: "1",
  },
  {
    id: "4",
    title: "Garden",
    href: "/home/garden",
    image: "/generic-product.png",
    categoryId: "1",
  },
  {
    id: "5",
    title: "Appliances",
    href: "/electronics/appliances",
    image: "/generic-product.png",
    categoryId: "2",
  },
  {
    id: "6",
    title: "Laptops",
    href: "/electronics/laptops",
    image: "/generic-product.png",
    categoryId: "2",
  },
  {
    id: "7",
    title: "Mobile Phones",
    href: "/electronics/mobile-phones",
    image: "/generic-product.png",
    categoryId: "2",
  },
  {
    id: "8",
    title: "Cardio",
    href: "/fitness/cardio",
    image: "/generic-product.png",
    categoryId: "3",
  },
  {
    id: "9",
    title: "Weights",
    href: "/fitness/weights",
    image: "/generic-product.png",
    categoryId: "3",
  },
];
