import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { makeGetRequest } from "../../../utils/apiUtils.ts"
import type { Card } from "../../../types/Client.ts"

const BASE_URL = import.meta.env.VITE_BANK_SERVICE_BASE_URL
const LOAD_CARDS_ENDPOINT = import.meta.env.VITE_LOAD_CARDS_ENDPOINT

export const loadCards = createAsyncThunk(
  "cards/loadCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(`${BASE_URL}${LOAD_CARDS_ENDPOINT}`)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as Card[],
    loading: true,
    error: null as any | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCards.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.cards = action.payload
      })
      .addCase(loadCards.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export default cardsSlice.reducer
