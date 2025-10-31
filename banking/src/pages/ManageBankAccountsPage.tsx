import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../hooks/hooks"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { Button, Title } from "@ui5/webcomponents-react"
import { loadCurrencies } from "../redux/features/credits/creditsSlice"
import { AllBankAccounts } from "../components/AllBankAccounts"
import { loadAllBankAccounts } from "../redux/features/bankAccounts/bankAccountsSlice"
import { CreateBankAccountDialog } from "../components/CreateBankAccountDialog"

export const ManageBankAccounts: React.FC = () => {
  const dispatch = useAppDispatch()
  const [openBankAccountDialog, setOpenBankAccountDialog] = useState(false)

  useEffect(() => {
    dispatch(loadCurrencies())
    dispatch(loadAllBankAccounts())
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
        <AllBankAccounts showDetails={false} />
      </div>
    </div>
  )
}

const ManageBankAccountsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <ManageBankAccounts />
    </Provider>
  )
}

export default ManageBankAccountsPage
