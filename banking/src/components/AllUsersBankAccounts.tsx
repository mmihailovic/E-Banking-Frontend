import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import {
  loadBankAccounts,
  setSelectedBankAccountNumber,
} from "../redux/features/bankAccounts/bankAccountsSlice"
import { AnalyticalTable } from "@ui5/webcomponents-react"
import { Provider } from "react-redux"
import { store } from "../redux/store"

export const AllUsersBankAccountsComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { bankAccounts } = useAppSelector((state) => state.bankAccounts)

  const columns = [
    { Header: "Account Number", accessor: "accountNumber" },
    { Header: "Balance", accessor: "balance" },
    { Header: "Available Balance", accessor: "availableBalance" },
  ]

  const handleRowClick = (event: any) => {
    const selectedBankAccount = event.detail.row.original
    dispatch(setSelectedBankAccountNumber(selectedBankAccount.accountNumber))
    navigate("/bank-account")
  }

  useEffect(() => {
    dispatch(loadBankAccounts())
  }, [dispatch])

  return (
    <AnalyticalTable
      data={bankAccounts}
      columns={columns}
      scaleWidthMode="Smart"
      onRowClick={handleRowClick}
    />
  )
}

const AllUsersBankAccounts: React.FC = () => {
  return (
    <Provider store={store}>
      <AllUsersBankAccountsComponent />
    </Provider>
  )
}

export default AllUsersBankAccounts
