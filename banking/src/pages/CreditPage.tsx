import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../hooks/hooks"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { Title, Text, Button } from "@ui5/webcomponents-react"
import CreditRequests from "../components/CreditRequests"
import {
  loadApprovedCreditRequests,
  loadCreditTypes,
  loadCurrencies,
  loadDeniedCreditRequests,
  loadPendingCreditRequests,
} from "../redux/features/credits/creditsSlice"
import CreditTypes from "../components/CreditTypes"
import { ApplyForCreditDialog } from "../components/ApplyForCredit"
import { loadBankAccounts } from "../redux/features/bankAccounts/bankAccountsSlice"

export const Credits: React.FC = () => {
  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    dispatch(loadCurrencies())
    dispatch(loadBankAccounts())
    dispatch(loadApprovedCreditRequests())
    dispatch(loadPendingCreditRequests())
    dispatch(loadDeniedCreditRequests())
    dispatch(loadCreditTypes())
  }, [dispatch])

  return (
    <div className="container">
      <div className="content">
        <Title>Credit requests</Title>
        <CreditRequests />
        <Title level="H3">Do you want to take out a loan?</Title>
        <Text>Select one from the offer.</Text>
        <Button onClick={() => setOpenDialog(true)}>Apply for credit</Button>
        <ApplyForCreditDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
        <CreditTypes />
      </div>
    </div>
  )
}

const CreditsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <Credits />
    </Provider>
  )
}

export default CreditsPage
