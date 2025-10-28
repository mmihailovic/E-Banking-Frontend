import { useAppSelector } from "../hooks/hooks"
import { TabContainer, Tab, AnalyticalTable } from "@ui5/webcomponents-react"

export const CreditRequests: React.FC = () => {
  const {
    approvedCreditRequests,
    pendingCreditRequests,
    deniedCreditRequests,
  } = useAppSelector((state) => state.credits)

  const columns = [
    { Header: "Amount", accessor: "loanAmount" },
    { Header: "Currency", accessor: "currency.name" },
    { Header: "Type", accessor: "creditType.name" },
    { Header: "Purpose", accessor: "loanPurpose" },
    { Header: "Term", accessor: "loanTerm" },
  ]

  return (
    <div>
      <TabContainer collapsed={false}>
        <Tab text="Approved">
          <AnalyticalTable
            data={approvedCreditRequests}
            columns={columns}
            scaleWidthMode="Smart"
          />
        </Tab>

        <Tab text="Pending">
          <AnalyticalTable
            data={pendingCreditRequests}
            columns={columns}
            scaleWidthMode="Smart"
          />
        </Tab>

        <Tab text="Denied">
          <AnalyticalTable
            data={deniedCreditRequests}
            columns={columns}
            scaleWidthMode="Smart"
          />
        </Tab>
      </TabContainer>
    </div>
  )
}

export default CreditRequests
