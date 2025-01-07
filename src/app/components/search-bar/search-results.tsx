import { getProductsBySearchText } from "@/app/requests";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function SearchResults({ search }: { search: string }) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const searchResult = useQuery({
    queryKey: ["search", { search }],
    queryFn: async () => {
      const query = new URLSearchParams();

      query.set("search", search);

      return await getProductsBySearchText(query);
    },
  });

  if (searchResult.isLoading) {
    return <div>loading data...</div>;
  }

  setSearchResults(searchResult.data);

  return (
    <div className="absolute rounded-md shadow-md bg-white">
      {searchResults.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}

export default SearchResults;
