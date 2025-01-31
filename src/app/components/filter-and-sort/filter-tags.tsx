import { Button } from "@/app/components/ui/button";
import { updateCurrentFilter } from "@/lib/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

function FilterTags() {
  const dispatch = useAppDispatch();
  const [sortByName, setSortByName] = useState("");
  const { initial, current } = useAppSelector((state) => state.filter);

  useEffect(() => {
    switch (current.sortBy) {
      case "priceLowHigh":
        setSortByName("Price: Low to High");
        break;
      case "priceHighLow":
        setSortByName("Price: High to Low");
        break;
      default:
        setSortByName("");
        break;
    }
  }, [current.sortBy]);

  const removePriceMin = () => {
    dispatch(updateCurrentFilter({ priceMin: initial.priceMin }));
  };

  const removePriceMax = () => {
    dispatch(updateCurrentFilter({ priceMax: initial.priceMax }));
  };

  const removeSortBy = () => {
    dispatch(updateCurrentFilter({ sortBy: "none" }));
  };


  return (
    <div className="space-x-2 text-xs lg:text-sm">
      {current.priceMin !== initial.priceMin && (
        <Button variant="outline" onClick={removePriceMin}>
          Min. Price: ${current.priceMin} <X />
        </Button>
      )}
      {current.priceMax !== initial.priceMax && (
        <Button variant="outline" onClick={removePriceMax}>
          Max. Price: ${current.priceMax} <X />
        </Button>
      )}
      {current.sortBy !== "none" && (
        <Button variant="outline" onClick={removeSortBy}>
          Sort By {sortByName} <X />
        </Button>
      )}
    </div>
  );
}

export default FilterTags;
