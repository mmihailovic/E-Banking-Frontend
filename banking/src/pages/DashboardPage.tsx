import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../hooks/hooks"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { Button, Title } from "@ui5/webcomponents-react"
import { loadCurrencies } from "../redux/features/credits/creditsSlice"
import { AllBankAccounts } from "../components/AllBankAccounts"
import { loadAllBankAccounts } from "../redux/features/bankAccounts/bankAccountsSlice"
import { AllCards } from "../components/AllCards"
import { CreateBankAccountDialog } from "../components/CreateBankAccountDialog"
import { loadCardIssuers } from "../redux/features/cards/cardsSlice"
import { CreateCardDialog } from "../components/CreateCardDialog"

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const [openBankAccountDialog, setOpenBankAccountDialog] = useState(false)
  const [openCardDialog, setOpenCardDialog] = useState(false)

  useEffect(() => {
    dispatch(loadCurrencies())
    dispatch(loadAllBankAccounts())
    dispatch(loadCardIssuers())
  }, [dispatch])

  return (
    <div className="container">
      <div className="content">
        <Title>Bank accounts</Title>
        <CreateBankAccountDialog
          open={openBankAccountDialog}
          onClose={() => setOpenBankAccountDialog(false)}
        />
        <Button onClick={() => setOpenBankAccountDialog(true)}>Create</Button>
        <AllBankAccounts />
        <Title>Cards</Title>
        <CreateCardDialog
          open={openCardDialog}
          onClose={() => setOpenCardDialog(false)}
        />
        <Button onClick={() => setOpenCardDialog(true)}>Create</Button>
        <AllCards />
      </div>
    </div>
  )
}

const DashboardPage: React.FC = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  )
}

export default DashboardPage
