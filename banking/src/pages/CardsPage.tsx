import React, { useEffect } from "react"
import { useAppDispatch } from "../hooks/hooks"
import { loadCards } from "../redux/features/cards/cardsSlice"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import AllUsersCards from "../components/AllUsersCards"
import { Title } from "@ui5/webcomponents-react"

export const Cards: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadCards())
  }, [dispatch])

  return (
    <div className="container">
      <div className="content">
        <Title>Cards</Title>
        <AllUsersCards />
      </div>
    </div>
  )
}

const CardsPage: React.FC = () => {
  return (
    <Provider store={store}>
      <Cards />
    </Provider>
  )
}

export default CardsPage
