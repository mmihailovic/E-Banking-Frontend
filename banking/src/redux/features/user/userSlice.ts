import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { makeGetRequest, makePostRequest } from '../../../utils/apiUtils.ts';
import type { BankAccount, TransactionsForBankAccount, Transfer } from '../../../types/Client.ts';

const BANK_ACCOUNTS_ENDPOINT = import.meta.env.VITE_BANK_ACCOUNTS_ENDPOINT;
const BANK_ACCOUNT_DETAILS = import.meta.env.VITE_BANK_ACCOUNT_DETAILS_ENDPOINT;
const TRANSACTIONS_FOR_BANK_ACCOUNT = import.meta.env.VITE_TRANSACTIONS_FOR_BANK_ACCOUNT_ENDPOINT;
const BASE_URL = import.meta.env.VITE_BANK_SERVICE_BASE_URL;
const TRANSACTIONS_BASE_URL = import.meta.env.VITE_TRANSACTION_SERVICE_BASE_URL;
const TRANSFER_MONEY_ENDPOINT = import.meta.env.VITE_TRANSFER_MONEY_ENDPOINT;

export const loadBankAccounts = createAsyncThunk('user/loadBankAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(`${BASE_URL}${BANK_ACCOUNTS_ENDPOINT}`)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadBankAccountDetails = createAsyncThunk('user/loadBankAccountDetails',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(`${BASE_URL}${BANK_ACCOUNT_DETAILS}/${id}`)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadTransactions = createAsyncThunk('user/loadTransactions',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await makeGetRequest(`${TRANSACTIONS_BASE_URL}${TRANSACTIONS_FOR_BANK_ACCOUNT}/${id}`)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const transferMoney = createAsyncThunk('user/transferMoney',
  async (data: Transfer, { rejectWithValue }) => {
    try {
      const response = await makePostRequest(`${TRANSACTIONS_BASE_URL}${TRANSFER_MONEY_ENDPOINT}`, data)

      return await response.json()
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    bankAccounts: [] as BankAccount[],
    transactionsForBankAccount: [] as TransactionsForBankAccount[],
    selectedBankAccountNumber: null as number | null,
    selectedBankAccount: null as BankAccount | null,
    loading: true,
    error: null as any | null
  },
  reducers: {
    setSelectedBankAccountNumber(state, action) {
        state.selectedBankAccountNumber = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBankAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBankAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bankAccounts = action.payload
      })
      .addCase(loadBankAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(loadBankAccountDetails.fulfilled, (state, action) => {
        state.selectedBankAccount = action.payload
      })
      .addCase(loadTransactions.fulfilled, (state, action) => {
        state.transactionsForBankAccount = action.payload
      })
  },
});
export const { setSelectedBankAccountNumber } = userSlice.actions;
export default userSlice.reducer;