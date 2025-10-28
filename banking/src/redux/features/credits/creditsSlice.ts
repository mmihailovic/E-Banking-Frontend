import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { makeGetRequest, makePostRequest } from "../../../utils/apiUtils.ts"
import type {
  ApplyForCredit,
  CreditRequest,
  CreditType,
  Currency,
} from "../../../types/Client.ts"

const BASE_URL = import.meta.env.VITE_BANK_SERVICE_BASE_URL
const LOAD_CREDIT_REQUESTS = import.meta.env.VITE_LOAD_CREDIT_REQUESTS
const LOAD_CREDIT_TYPES = import.meta.env.VITE_LOAD_CREDIT_TYPES
const APPLY_FOR_CREDIT = import.meta.env.VITE_APPLY_FOR_CREDIT
const LOAD_CURRENCIES = import.meta.env.VITE_LOAD_CURRENCIES

export const loadApprovedCreditRequests = createAsyncThunk(
  "credits/loadApprovedCreditRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(
        `${BASE_URL}${LOAD_CREDIT_REQUESTS}/APPROVED`,
      )

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const loadPendingCreditRequests = createAsyncThunk(
  "credits/loadPendingCreditRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(
        `${BASE_URL}${LOAD_CREDIT_REQUESTS}/PENDING`,
      )

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const loadDeniedCreditRequests = createAsyncThunk(
  "credits/loadDeniedCreditRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(
        `${BASE_URL}${LOAD_CREDIT_REQUESTS}/DENIED`,
      )

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const loadCreditTypes = createAsyncThunk(
  "credits/loadCreditTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(`${BASE_URL}${LOAD_CREDIT_TYPES}`)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const applyForCredit = createAsyncThunk(
  "credits/applyForCredit",
  async (creditRequest: ApplyForCredit, { rejectWithValue }) => {
    try {
      const response = await makePostRequest(
        `${BASE_URL}${APPLY_FOR_CREDIT}`,
        creditRequest,
      )

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const loadCurrencies = createAsyncThunk(
  "credits/loadCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(`${BASE_URL}${LOAD_CURRENCIES}`)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const creditsSlice = createSlice({
  name: "credits",
  initialState: {
    approvedCreditRequests: [] as CreditRequest[],
    pendingCreditRequests: [] as CreditRequest[],
    deniedCreditRequests: [] as CreditRequest[],
    currencies: [] as Currency[],
    creditTypes: [] as CreditType[],
    selectedCreditType: null as CreditType | null,
    loading: true,
    error: null as any | null,
  },
  reducers: {
    setSelectedCreditType(state, action) {
      state.selectedCreditType = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApprovedCreditRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadApprovedCreditRequests.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.approvedCreditRequests = action.payload
      })
      .addCase(loadApprovedCreditRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadPendingCreditRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadPendingCreditRequests.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.pendingCreditRequests = action.payload
      })
      .addCase(loadPendingCreditRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadDeniedCreditRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadDeniedCreditRequests.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.deniedCreditRequests = action.payload
      })
      .addCase(loadDeniedCreditRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadCreditTypes.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.creditTypes = action.payload
      })
      .addCase(loadCurrencies.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.currencies = action.payload
      })
      .addCase(applyForCredit.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.pendingCreditRequests.push(action.payload)
      })
  },
})
export const { setSelectedCreditType } = creditsSlice.actions
export default creditsSlice.reducer
