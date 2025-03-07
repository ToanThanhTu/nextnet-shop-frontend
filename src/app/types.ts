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
  sale: number;
  salePrice: number;
  stock?: number;
  image?: string;
  subCategoryId?: number;
};

export type Filter = {
  initial: {
    priceMin: number;
    priceMax: number;
    sortBy: string;
    limit: string;
    page: string;
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
  id?: number;
  userId?: number | null;
  productId: number;
  quantity: number;
  user?: User;
  product: Product;
};

export type CartItemDTO = {
  id?: number;
  userId?: number | null;
  productId: number;
  quantity: number;
}

export type CartState = {
  cart: CartItem[];
  totalPrice: number;
}

export type Order = {
  id: number;
  userId: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}

export type OrderDTO = {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export type OrderItemDTO = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

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
  cartItems?: CartItemDTO[];
  orders?: Order[];
}

export type UserDTO = {
  id: number;
  name: string;
  email: string;
  role: string;
  cartItems?: CartItemDTO[];
  orders?: OrderDTO[];
}

export type UserResigtration = {
  name: string;
  email: string;
  password: string;
}

export type Auth = {
  token: null | string;
  user: null | UserDTO;
  loading: boolean;
  error: null | string;
  success: boolean;
};
