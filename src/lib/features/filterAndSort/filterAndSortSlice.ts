import { FilterAndSort } from "@/app/types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const initialState: FilterAndSort = {
  priceMin: 0,
  priceMax: 3000,
  sortBy: "none",
  limit: 12,
};

const filterAndSortSlice = createSlice({
  name: "filterAndSort",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterAndSort>) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterAndSortSlice.actions;

export const applyFilter = (filter: FilterAndSort) => {
  return (dispatch: Dispatch) => {
    dispatch(setFilter(filter));
  };
};

export default filterAndSortSlice.reducer;
