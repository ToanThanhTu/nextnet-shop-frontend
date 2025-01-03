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
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FilterAndSort() {
  const [sortBy, setSortBy] = useState("none");
  const [limit, setLimit] = useState("12");

  return (
    <div className="flex justify-end items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            FILTER BY PRICE <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex gap-2 w-80 p-2">
            0
            <Slider defaultValue={[3000]} max={3000} step={1} />
            3000
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            SORT BY <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priceLowHigh">
              Price Low-High
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priceHighLow">
              Price High-Low
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            SHOW {limit} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={limit} onValueChange={setLimit}>
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

export default FilterAndSort;
