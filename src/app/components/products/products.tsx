import ProductCard from "@/app/components/products/product-card";
import { Product } from "@/app/types";

function Products({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;