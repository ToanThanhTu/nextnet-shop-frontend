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
  id: number;
  title: string;
  description?: string;
  href?: string;
  image?: string;
  subCategories?: SubCategory[];
};

export type SubCategory = {
  id: number;
  title: string;
  description?: string;
  href?: string;
  image?: string;
  categoryId: number;
};

export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  sale?: number;
  stock: number;
  subCategoryId: number;
};

export type Filter = {
  title: string;
  category: string;
  priceMin: number;
  priceMax: number;
  onSale: boolean;
};
