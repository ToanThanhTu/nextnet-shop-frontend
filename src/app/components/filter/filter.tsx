import FilterSelectionArea from "@/app/components/filter/filterSelectionArea";
import { Category } from "@/app/types";
import TuneIcon from "@mui/icons-material/Tune";
import Link from "next/link";

async function Filter() {
  let data = await fetch("http://localhost:3001/categories");
  let categories = await data.json();

  console.log(categories);

  return (
    <div>
      <h2 className="flex items-center gap-2 uppercase">
        <TuneIcon />
        Filter
      </h2>

      <FilterSelectionArea>
        <h3>Categories</h3>

        <ul>
          {categories.map((category: Category) => (
            <li key={category.id}>
              <Link href={""}>{category.title}</Link>
              <ul>
                {category.subCategories?.map((subCategory) => (
                  <li key={subCategory.id}>
                    <Link href={""}>{subCategory.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </FilterSelectionArea>
    </div>
  );
}

export default Filter;
