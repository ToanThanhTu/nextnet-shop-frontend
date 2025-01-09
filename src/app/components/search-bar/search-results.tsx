import { getProductsBySearchText } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  search: string;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

function SearchResults({ search, setShowResults }: Props) {
  const searchResult = useQuery({
    queryKey: ["search", { search }],
    queryFn: async () => {
      const query = new URLSearchParams();

      query.set("search", search);

      return await getProductsBySearchText(query);
    },
  });

  const handleClick = () => {
    setShowResults(false);
  }

  if (searchResult.isLoading) {
    return <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2">Searching...</div>;
  }

  if (searchResult.isError) {
    return <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2">Products not found</div>;
  }

  const products: Product[] = searchResult.data;

  return (
    <div className="absolute top-10 w-full p-4 rounded-md shadow-md bg-white space-y-2 z-50">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`} className="flex gap-2" onClick={handleClick}>
          <Image src={`/api/products/${product.id}/image`} alt={`${product.title} image`} width={100} height={100} />
          <div>
            <h3>{product.title}</h3>
            <p>
              ${product.salePrice} {product.sale > 0 && <span className="text-sm">was ${product.price}</span>}
            </p>
            {product.sale > 0 && <p className="bg-red-500 p-1 w-fit text-xs text-white">{product.sale}% OFF</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
