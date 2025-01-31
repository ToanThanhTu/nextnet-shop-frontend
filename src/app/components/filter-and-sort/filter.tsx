"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Slider } from "@/app/components/ui/slider";
import { setLimit, setSortBy, updateCurrentFilter } from "@/lib/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChevronDown } from "lucide-react";

function Filter() {
  const dispatch = useAppDispatch();
  const { initial, current } = useAppSelector((state) => state.filter);

  const handlePriceChange = (value: number[]) => {
    dispatch(updateCurrentFilter({ priceMin: value[0], priceMax: value[1] }));
  };

  const handleSortByChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const handleLimitChange = (value: string) => {
    dispatch(setLimit(value));
  };

  return (
    <div className="flex lg:justify-end items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xs lg:text-sm">
            FILTER BY PRICE <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex gap-2 w-80 p-2">
            ${initial.priceMin}
            <Slider
              defaultValue={[current.priceMin, current.priceMax]}
              onValueChange={handlePriceChange}
              value={[current.priceMin, current.priceMax]}
              onValueCommit={handlePriceChange}
              min={initial.priceMin}
              max={initial.priceMax}
              step={1}
              minStepsBetweenThumbs={1}
            />
            ${initial.priceMax}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xs lg:text-sm">
            SORT BY <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={current.sortBy} onValueChange={handleSortByChange}>
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priceLowHigh">Price Low-High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priceHighLow">Price High-Low</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xs lg:text-sm">
            SHOW {current.limit} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={current.limit} onValueChange={handleLimitChange}>
            <DropdownMenuRadioItem value="12">12</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="24">24</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="36">36</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="48">48</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Filter;
