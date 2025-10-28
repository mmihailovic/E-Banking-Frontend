import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { loadBankAccountDetails } from "../redux/features/bankAccounts/bankAccountsSlice"
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableCell,
  Title,
  Button,
} from "@ui5/webcomponents-react"
import { TransactionsForBankAccount } from "../components/TransactionsForBankAccount"
import { TransferMoneyDialog } from "../components/TransferMoneyDialog"
import { Provider } from "react-redux"
import { store } from "../redux/store"

export const BankAccountDetails: React.FC = () => {
  const { selectedBankAccount, selectedBankAccountNumber } = useAppSelector(
    (state) => state.bankAccounts,
  )
  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    dispatch(loadBankAccountDetails(selectedBankAccountNumber!))
  }, [dispatch])

  return (
    <div className="container">
      <div className="content">
        <Title>Account details</Title>
        <Button onClick={() => setOpenDialog(true)}>Create transaction</Button>
        <TransferMoneyDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        ></TransferMoneyDialog>
        <div>
          <Table>
            <TableRow>
              <TableHeaderCell>Account Number</TableHeaderCell>
              <TableCell>{selectedBankAccount?.accountNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell>Balance</TableHeaderCell>
              <TableCell>{selectedBankAccount?.balance}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell>Available balance</TableHeaderCell>
              <TableCell>{selectedBankAccount?.availableBalance}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell>Creation date</TableHeaderCell>
              <TableCell>
                {selectedBankAccount ? (
                  new Date(
                    selectedBankAccount!.creationDate,
                  ).toLocaleDateString("en-de")
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell>Currency</TableHeaderCell>
              <TableCell>{selectedBankAccount?.currencyDTO.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeaderCell>Active</TableHeaderCell>
              <TableCell>
                {selectedBankAccount?.active ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          </Table>
          <TransactionsForBankAccount />
        </div>
      </div>
    </div>
  )
}

const BankAccountDetailsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <BankAccountDetails />
    </Provider>
  )
}

export default BankAccountDetailsPage
