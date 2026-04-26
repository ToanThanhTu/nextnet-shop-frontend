import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Auth, UserDTO } from "./entities"
import { loginUser, registerUser } from "./auth.thunks"

const initialState: Auth = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
}

type Credentials = {
  user: UserDTO
  token: string
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Pure reducer. Side effects (clearing localStorage) live in the listener
     * middleware; see src/lib/storageListeners.ts.
     */
    logout(state) {
      state.user = null
      state.token = null
      state.loading = false
      state.error = null
      state.success = false
    },
    setCredentials(state, action: PayloadAction<Credentials>) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload.user
        state.token = payload.token
        state.error = null
        state.success = true
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
      })
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer
