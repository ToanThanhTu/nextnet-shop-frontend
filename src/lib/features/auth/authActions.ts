import { UserResigtration } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userRegistration: UserResigtration, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegistration),
      };

      const response = await fetch("/api/users/register", config);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error as string);
      }

      return await response.json();
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };

      const response = await fetch("/api/users/login", config);

      if (!response.ok) {
        const error = await response.json();

        if (response.status === 401) {
          return rejectWithValue("Invalid credentials");
        }

        return rejectWithValue(error as string);
      }

      const data = await response.json();

      console.log("login data: ", data);

      const signedInUser = {
        user: data.userDto,
        token: data.userToken,
      }

      localStorage.setItem("signedInNextNetShopUser", JSON.stringify(signedInUser));

      return signedInUser;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  }
);
