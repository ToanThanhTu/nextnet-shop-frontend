import { Button } from "@/app/components/ui/button";
import { updateCurrentFilter } from "@/lib/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { X } from "lucide-react";

function FilterTags() {
  const { initial, current } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

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
    <div className="space-x-2">
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
          Sort By: {current.sortBy} <X />
        </Button>
      )}
    </div>
  );
}

export default FilterTags;
