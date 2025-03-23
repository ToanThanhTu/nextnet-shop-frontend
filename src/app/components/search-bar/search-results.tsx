import { useGetProductsBySearchTextQuery } from "@/lib/features/products/productsSlice"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface Props {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  setSearchBarFocus: (focus: boolean) => void
}

function SearchResults({ search, setSearch, setSearchBarFocus }: Props) {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsBySearchTextQuery({ search })

  const handleClick = () => {
    setSearch("")
    setSearchBarFocus(false)
  }

  let content: React.ReactNode

  if (search.length < 1) {
    content = null
  }
  else if (search.length < 3) {
    content = (
      <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2 z-50">
        Please enter at least 3 characters
      </div>
    )
  } else if (isLoading) {
    content = (
      <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2 z-50">
        Searching...
      </div>
    )
  } else if (isSuccess) {
    content = (
      <div className="absolute top-10 w-full rounded-md shadow-md bg-white space-y-2 z-50 overflow-hidden">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="flex gap-4 p-4 items-center hover:opacity-80 hover:bg-gray-100"
            onClick={handleClick}
          >
            <Image
              src={`/api/products/${product.id}/image`}
              alt={`${product.title} image`}
              width={100}
              height={100}
            />
            <div>
              <h3 className="text-lg font-bold">{product.title}</h3>
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
    )
  } else if (isError) {
    content = (
      <div className="absolute top-10 p-4 rounded-md shadow-md bg-white space-y-2 flex items-center justify-center z-50">
        Product not found :(
      </div>
    )
  }

  return <>{content}</>
}

export default SearchResults
