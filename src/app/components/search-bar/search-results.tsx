import { useGetProductsBySearchTextQuery } from "@/lib/features/products/productsSlice";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  search: string;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

function SearchResults({ search, setShowResults }: Props) {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsBySearchTextQuery({ search });

  const handleClick = () => {
    setShowResults(false);
  };

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2">
        Searching...
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="absolute top-10 w-full p-4 rounded-md shadow-md bg-white space-y-2 z-50">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="flex gap-2"
            onClick={handleClick}
          >
            <Image
              src={`/api/products/${product.id}/image`}
              alt={`${product.title} image`}
              width={100}
              height={100}
            />
            <div>
              <h3>{product.title}</h3>
              <p>
                ${product.salePrice}{" "}
                {product.sale > 0 && <span className="text-sm">was ${product.price}</span>}
              </p>
              {product.sale > 0 && (
                <p className="bg-red-500 p-1 w-fit text-xs text-white">{product.sale}% OFF</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2">
        Product not found
      </div>
    );
  }

  return <>{content}</>;
}

export default SearchResults;
