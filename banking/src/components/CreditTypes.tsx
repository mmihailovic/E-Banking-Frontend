import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { AnalyticalTable } from "@ui5/webcomponents-react"
import { setSelectedCreditType } from "../redux/features/credits/creditsSlice"

export const CreditTypes: React.FC = () => {
  const { creditTypes } = useAppSelector((state) => state.credits)
  const dispatch = useAppDispatch()

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Nominal interest rate", accessor: "nominalInterestRate" },
    { Header: "Minimum loan term", accessor: "minLoanTerm" },
    { Header: "Maximum loan term", accessor: "maxLoanTerm" },
    { Header: "Maximum loan amount", accessor: "maxLoanAmount" },
    { Header: "Prepayment", accessor: "prepayment" },
  ]

  const handleRowClick = (event: any) => {
    const selectedCreditType = event.detail.row.original
    dispatch(setSelectedCreditType(selectedCreditType))
  }

  return (
    <AnalyticalTable
      data={creditTypes}
      columns={columns}
      scaleWidthMode="Smart"
      onRowClick={handleRowClick}
      selectionMode="Single"
    />
  )
}

export default CreditTypes
