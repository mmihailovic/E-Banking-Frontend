import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../hooks/hooks"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import { Button, Title } from "@ui5/webcomponents-react"
import { AllCards } from "../components/AllCards"
import {
  loadAllCards,
  loadCardIssuers,
} from "../redux/features/cards/cardsSlice"
import { CreateCardDialog } from "../components/CreateCardDialog"

export const ManageCards: React.FC = () => {
  const dispatch = useAppDispatch()
  const [openCardDialog, setOpenCardDialog] = useState(false)

  useEffect(() => {
    dispatch(loadCardIssuers())
    dispatch(loadAllCards())
  }, [dispatch])

  return (
    <div className="container">
      <div className="content">
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

const ManageCardsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <ManageCards />
    </Provider>
  )
}

export default ManageCardsPage
