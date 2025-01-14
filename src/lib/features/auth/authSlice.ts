"use client";

import { Auth, User, UserDTO } from "@/app/types";
import { loginUser, registerUser } from "@/lib/features/auth/authActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Auth = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

type Credentials = {
  user: UserDTO;
  token: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      localStorage.removeItem("signedInNextNetShopUser");
    },
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.success = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.error = null;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
