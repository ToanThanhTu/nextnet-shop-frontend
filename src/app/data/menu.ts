import { MenuItem } from "@/app/types";

export const computers: MenuItem[] = [
  { title: "Laptops", href: "/computers/laptops" },
  { title: "Desktops", href: "/computers/desktops" },
];

export const home: MenuItem[] = [
  { title: "Bedding", href: "/home/bedding" },
  { title: "Living", href: "/home/living" },
  { title: "Kitchen", href: "/home/kitchen" },
  { title: "Garden", href: "/home/garden" },
];

export const fitness: MenuItem[] = [
  { title: "Cardio", href: "/fitness/cardio" },
  { title: "Weights", href: "/fitness/weights" },
];

export const electronics: MenuItem[] = [
  { title: "Appliances", href: "/electronics/appliances" },
  { title: "Computers", href: "/electronics/computers", children: computers },
  { title: "Mobile Phones", href: "/electronics/mobile-phones" },
];

export const menu: MenuItem[] = [
  { title: "Best Sellers", href: "/bestsellers" },
  { title: "Today's Deals", href: "/deals" },
  { title: "Home", href: "/home", children: home },
  { title: "Fitness", href: "/fitness", children: fitness },
  { title: "Electronics", href: "/electronics", children: electronics },
  { title: "Hobbies", href: "/electronics" },
];
