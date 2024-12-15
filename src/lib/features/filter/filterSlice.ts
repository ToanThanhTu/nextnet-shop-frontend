import { Filter } from "@/app/types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const initialState: Filter = {
  title: "",
  category: "All",
  priceMin: 0,
  priceMax: 3000,
  onSale: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Filter>) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const applyFilter = (filter: Filter) => {
  return (dispatch: Dispatch) => {
    dispatch(setFilter(filter));
  };
};

export default filterSlice.reducer;
