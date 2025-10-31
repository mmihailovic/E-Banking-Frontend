import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { makeGetRequest, makePostRequest } from "../../../utils/apiUtils.ts"
import type { Card, CardIssuer, CreateCard } from "../../../types/Client.ts"

const BASE_URL = import.meta.env.VITE_BANK_SERVICE_BASE_URL
const LOAD_CARDS_ENDPOINT = import.meta.env.VITE_LOAD_CARDS_ENDPOINT
const CREATE_CARD_ENDPOINT = import.meta.env.VITE_CREATE_CARD_ENDPOINT
const LOAD_CARD_ISSUERS_ENDPOINT = import.meta.env
  .VITE_LOAD_CARD_ISSUERS_ENDPOINT
const LOAD_ALL_CARDS_ENDPOINT = import.meta.env.VITE_LOAD_ALL_CARDS_ENDPOINT

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

export const loadAllCards = createAsyncThunk(
  "cards/loadAllCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(
        `${BASE_URL}${LOAD_ALL_CARDS_ENDPOINT}`,
      )

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (data: CreateCard, { rejectWithValue }) => {
    try {
      const response = await makePostRequest(
        `${BASE_URL}${CREATE_CARD_ENDPOINT}`,
        data,
      )

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const loadCardIssuers = createAsyncThunk(
  "cards/loadCardIssuers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(
        `${BASE_URL}${LOAD_CARD_ISSUERS_ENDPOINT}`,
      )

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
    cardIssuers: [] as CardIssuer[],
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
      .addCase(loadCardIssuers.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.cardIssuers = action.payload
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.cards.push(action.payload)
      })
      .addCase(loadAllCards.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.cards = action.payload
      })
  },
})
export default cardsSlice.reducer
