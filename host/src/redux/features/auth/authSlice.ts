import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { LoginCredentials, User } from "../../../types/auth.ts"
import { makePostRequest } from "../../../utils/apiUtils.ts"

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT
const CHECK_CREDENTIALS_ENDPOINT = import.meta.env
  .VITE_CHECK_CREDENTIALS_ENDPOINT
const LOGOUT_ENDPOINT = import.meta.env.VITE_LOGOUT_ENDPOINT

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await makePostRequest(
        `${BASE_URL}${LOGIN_ENDPOINT}`,
        credentials,
      )

      return response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const checkCredentials = createAsyncThunk(
  "auth/checkCredentials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makePostRequest(
        `${BASE_URL}${CHECK_CREDENTIALS_ENDPOINT}`,
      )
      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await makePostRequest(`${BASE_URL}${LOGOUT_ENDPOINT}`)
      return true
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    isAuthenticated: false,
    loading: false,
    error: null as any | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(checkCredentials.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(checkCredentials.rejected, (state) => {
        state.isAuthenticated = false
      })
  },
})

export default authSlice.reducer
