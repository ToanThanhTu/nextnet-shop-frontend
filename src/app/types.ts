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

export type Category = {
  id: string;
  title: string;
  description?: string;
  href: string;
  image: string;
};

export type SubCategory = {
  id: string;
  title: string;
  description?: string;
  href: string;
  image: string;
  categoryId: string;
};

export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  sale?: number;
  stock: number;
  subCategoryId: string;
};

export type Filter = {
  title: string;
  category: string;
  priceMin: number;
  priceMax: number;
  onSale: boolean;
};
