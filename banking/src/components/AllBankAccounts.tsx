import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { setSelectedBankAccountNumber } from "../redux/features/bankAccounts/bankAccountsSlice"
import { AnalyticalTable } from "@ui5/webcomponents-react"

interface AllBankAccountsProps {
  showDetails: boolean
}

export const AllBankAccounts: React.FC<AllBankAccountsProps> = ({
  showDetails,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { bankAccounts } = useAppSelector((state) => state.bankAccounts)

  const columns = [
    { Header: "Account Number", accessor: "accountNumber" },
    { Header: "Balance", accessor: "balance" },
    { Header: "Available Balance", accessor: "availableBalance" },
  ]

  const handleRowClick = (event: any) => {
    if (!showDetails) return
    const selectedBankAccount = event.detail.row.original
    dispatch(setSelectedBankAccountNumber(selectedBankAccount.accountNumber))
    navigate("/bank-account")
  }

  return (
    <AnalyticalTable
      data={bankAccounts}
      columns={columns}
      scaleWidthMode="Smart"
      onRowClick={handleRowClick}
    />
  )
}
