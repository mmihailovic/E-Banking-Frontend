import React, { useEffect } from "react"
import { Title } from "@ui5/webcomponents-react"
import { AllBankAccounts } from "../components/AllBankAccounts"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { loadBankAccounts } from "../redux/features/bankAccounts/bankAccountsSlice"
import { useAppDispatch } from "../hooks/hooks"

export const BankAccounts: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadBankAccounts())
  }, [dispatch])

  return (
    <div className="container">
      <Title>Bank Accounts</Title>
      <AllBankAccounts showDetails={true} />
    </div>
  )
}

const BankAccountsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <BankAccounts />
    </Provider>
  )
}

export default BankAccountsPage
