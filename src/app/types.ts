export type MenuItem = {
  title: string;
  href: string;
  children?: MenuItem[];
};

export type Highlight = {
  title: string;
  image: string;
  href: string;
};

export type DiscoverCard = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

export type Category =
  | "All"
  | "Home"
  | "Electronics"
  | "Fitness"
  | "Hobbies"
  | "Appliances"
  | "Computers"
  | "Mobile Phones"
  | "Bedding"
  | "Living"
  | "Kitchen"
  | "Garden"
  | "Cardio"
  | "Weights"
  | "Laptops"
  | "Desktops";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
  sale?: number;
};

export type Filter = {
  title: string;
  category: Category;
  priceMin: number;
  priceMax: number;
  onSale: boolean;
};
