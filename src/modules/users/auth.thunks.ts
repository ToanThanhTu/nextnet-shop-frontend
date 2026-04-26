import { createAsyncThunk } from "@reduxjs/toolkit"
import type { UserRegistration } from "./entities"

function errorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof Error) return error.message
  return fallback
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userRegistration: UserRegistration, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userRegistration),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        return rejectWithValue(error as string)
      }

      return await response.json()
    } catch (error: unknown) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue("Invalid email or password")
        }
        const error = await response.json().catch(() => ({}))
        return rejectWithValue(error as string)
      }

      const data = await response.json()
      return {
        user: data.userDto,
        token: data.userToken,
      }
    } catch (error: unknown) {
      return rejectWithValue(errorMessage(error))
    }
  }
)
