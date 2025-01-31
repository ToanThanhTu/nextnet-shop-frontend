import SearchResults from "@/app/components/search-bar/search-results";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (search.length >= 3) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [search]);

  useEffect(() => {
    if (onFocus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [onFocus]);

  const handleFocus = () => {
    setOnFocus(true);
    setShowResults(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setOnFocus(false);
      setShowResults(false);
    }, 150);
  };

  return (
    <div className="flex items-center gap-2 w-full relative" onBlur={handleBlur} onAbort={handleBlur}>
      <Input
        type="text"
        placeholder="What are you looking for?"
        className="px-8 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Search className="absolute p-1 ml-1" />

      <Button variant="ghost" className="absolute right-2 p-1" onClick={() => setSearch("")}>
        <X />
      </Button>

      {onFocus && (
        <div className="fixed inset-0 top-[140px] h-screen bg-black bg-opacity-50 z-10" onClick={() => setOnFocus(false)} />
      )}

      {showResults && search.length >= 3 && <SearchResults search={search} setShowResults={setShowResults} />}
    </div>
  );
}

export default SearchBar;
