import { useAppSelector } from "../hooks/hooks"
import { AnalyticalTable } from "@ui5/webcomponents-react"

export const AllCards: React.FC = () => {
  const { cards } = useAppSelector((state) => state.cards)

  const columns = [
    { Header: "Number", accessor: "number" },
    { Header: "Type", accessor: "type" },
    { Header: "Issuer", accessor: "cardIssuer.name" },
    { Header: "Name", accessor: "name" },
    { Header: "Creation date", accessor: "creationDate" },
    { Header: "Expiration date", accessor: "expirationDate" },
    { Header: "CVV", accessor: "cvv" },
    { Header: "Limit", accessor: "cardLimit" },
    { Header: "Status", accessor: "status" },
  ]

  return (
    <AnalyticalTable data={cards} columns={columns} scaleWidthMode="Smart" />
  )
}

export default AllCards
