import { MenuItem } from "@/app/types";

export const computers: MenuItem[] = [
  { title: "Laptops", href: "/home/computers/laptops" },
  { title: "Desktops", href: "/home/computers/desktops" },
];

export const home: MenuItem[] = [
  { title: "Bedding", href: "/home/bedding" },
  { title: "Living", href: "/home/living" },
  { title: "Kitchen", href: "/home/kitchen" },
  { title: "Garden", href: "/home/garden" },
];

export const fitness: MenuItem[] = [
  { title: "Cardio", href: "/home/cardio" },
  { title: "Weights", href: "/home/weights" },
];

export const electronics: MenuItem[] = [
  { title: "Appliances", href: "/home/appliances" },
  { title: "Computers", href: "/home/computers", children: computers },
  { title: "Mobile Phones", href: "/home/mobile-phones" },
];

export const menu: MenuItem[] = [
  { title: "Best Sellers", href: "/home/bestsellers" },
  { title: "Today's Deals", href: "/home/deals" },
  { title: "Home", href: "/home", children: home },
  { title: "Fitness", href: "/home/fitness", children: fitness },
  { title: "Electronics", href: "/home/electronics", children: electronics },
  { title: "Hobbies", href: "/home/electronics" },
];
