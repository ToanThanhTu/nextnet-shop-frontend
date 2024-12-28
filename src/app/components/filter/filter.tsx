import TuneIcon from "@mui/icons-material/Tune";

async function Filter() {
  let data = await fetch("https://localhost:7193/categories");
  let categories = await data.json();

  console.log(categories);

  return (
    <div>
      <h2 className="flex items-center gap-2 uppercase">
        <TuneIcon />
        Filter
      </h2>

      <ul>
        <li>
          <h3>Categories</h3>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
