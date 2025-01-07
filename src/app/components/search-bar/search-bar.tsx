import SearchResults from "@/app/components/search-bar/search-results";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");  

  return (
    <div className="flex items-center gap-2 w-full relative">
      <Input
        type="text"
        placeholder="What are you looking for?"
        className="w-full pl-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search className="absolute p-1 ml-1" />

      {search.length >= 3 && <SearchResults search={search} />}      
    </div>
  );
}

export default SearchBar;
