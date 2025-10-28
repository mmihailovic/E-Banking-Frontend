import { configureStore } from "@reduxjs/toolkit"
import bankAccountsReducer from "./features/bankAccounts/bankAccountsSlice"
import cardsReducer from "./features/cards/cardsSlice"
import creditsReducer from "./features/credits/creditsSlice"

export const store = configureStore({
  reducer: {
    bankAccounts: bankAccountsReducer,
    cards: cardsReducer,
    credits: creditsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
