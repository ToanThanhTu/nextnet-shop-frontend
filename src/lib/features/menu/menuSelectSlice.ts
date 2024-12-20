import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface MenuSelectState {
  selectedMenu: number;
}

// Define the initial state using that type
const initialState: MenuSelectState = {
  selectedMenu: 0,
}

const menuSelectSlice = createSlice({
  name: "menuSelect",
  initialState,
  reducers: {
    setMenuSelect(state, action: PayloadAction<number>) {
      state.selectedMenu = action.payload;
    },
  },
});

export const { setMenuSelect } = menuSelectSlice.actions;

export const selectMenu = (menu: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setMenuSelect(menu));
  };
};

export default menuSelectSlice.reducer;