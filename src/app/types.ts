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
  slug?: string;
  description?: string;
  href?: string;
  image?: string;
  subCategories?: SubCategory[];
};

export type SubCategory = {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  href?: string;
  image?: string;
  categoryId: number;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price: number;
  image?: string;
  sale: number;
  salePrice: number;
  stock: number;
  subCategoryId: number;
};

export type Filter = {
  initial: {
    priceMin: number;
    priceMax: number;
  };
  current: {
    priceMin: number;
    priceMax: number;
    sortBy: string;
    limit: string;
    page: string;
  };
};

export type CartItem = {
  productId: number;
  title: string;
  price: number;
  salePrice: number;
  sale: number;
  quantity: number;
  stock: number;
};

export type Cart = CartItem[];

export type PaymentDetails = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export type UserDTO = {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type UserResigtration = {
  name: string;
  email: string;
  password: string;
}

export type Auth = {
  token: null | string;
  user: null | {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  loading: boolean;
  error: null | string;
  success: boolean;
};
