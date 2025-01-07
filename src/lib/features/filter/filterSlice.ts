import { Filter } from "@/app/types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const initialState: Filter = {
  initial: {
    priceMin: 0,
    priceMax: 10000,
  },
  current: {
    priceMin: 0,
    priceMax: 10000,
    sortBy: "none",
    limit: "12",
    page: "1",
  },
};

const filterAndSortSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setInitialFilter(state, action: PayloadAction<{ priceMin: number; priceMax: number }>) {
      state.initial = action.payload;
      state.current.priceMin = action.payload.priceMin;
      state.current.priceMax = action.payload.priceMax;
    },
    updateCurrentFilter(state, action: PayloadAction<Partial<Filter["current"]>>) {
      state.current = { ...state.current, ...action.payload };
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.current.sortBy = action.payload;
    },
    setPage(state, action: PayloadAction<string>) {
      state.current.page = action.payload;
    },
    setLimit(state, action: PayloadAction<string>) {
      state.current.limit = action.payload
    },
    resetToInitial(state) {
      state.current.priceMin = state.initial.priceMin;
      state.current.priceMax = state.initial.priceMax;
    },
  },
});

export const { setInitialFilter, updateCurrentFilter, setSortBy, setPage, setLimit, resetToInitial } = filterAndSortSlice.actions;

export default filterAndSortSlice.reducer;
