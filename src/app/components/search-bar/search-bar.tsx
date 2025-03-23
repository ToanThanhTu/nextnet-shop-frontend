import SearchResults from "@/app/components/search-bar/search-results"
import { Input } from "@/app/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface Props {
  searchBarFocus: boolean
  setSearchBarFocus: (focus: boolean) => void
}

function SearchBar({ searchBarFocus, setSearchBarFocus }: Props) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (searchBarFocus) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [searchBarFocus])

  return (
    <div className="flex items-center gap-2 w-full relative">
      <Input
        type="text"
        placeholder={searchBarFocus ? "What are you looking for?" : "Search"}
        className="w-full py-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchBarFocus(true)}
      />
      <Search className="absolute right-0 mr-2" size={18} strokeWidth={3} />

      <SearchResults search={search} setSearch={setSearch} setSearchBarFocus={setSearchBarFocus} />
    </div>
  )
}

export default SearchBar
