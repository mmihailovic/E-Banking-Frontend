import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import {
  Button,
  Dialog,
  Select,
  Option,
  Input,
  FlexBox,
  FlexBoxDirection,
} from "@ui5/webcomponents-react"
import { createCard } from "../redux/features/cards/cardsSlice"

interface CreateCardDialogProps {
  open: boolean
  onClose: () => void
}

export const CreateCardDialog: React.FC<CreateCardDialogProps> = ({
  open,
  onClose,
}) => {
  const { cardIssuers } = useAppSelector((state) => state.cards)
  const [type, setType] = useState("")
  const [issuerId, setIssuerId] = useState(0)
  const [name, setName] = useState("")
  const [bankAccountNumber, setBankAccountNumber] = useState(0)
  const [limit, setLimit] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIssuerId(cardIssuers[0]?.id)
  }, [cardIssuers])

  const handleSubmit = () => {
    dispatch(createCard({ type, issuerId, name, bankAccountNumber, limit }))
    onClose()
  }

  return (
    <Dialog
      open={open}
      headerText="Create card"
      footer={
        <div>
          <Button onClick={onClose}>Close</Button>
          <Button design="Emphasized" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      }
    >
      <FlexBox direction={FlexBoxDirection.Column}>
        <Select onChange={(e: any) => setType(e.detail.selectedOption.value)}>
          <Option key={"CREDIT"} value={"CREDIT"}>
            Current
          </Option>
          <Option key={"DEBIT"} value={"DEBIT"}>
            Foreign
          </Option>
        </Select>

        <Select
          onChange={(e: any) => setIssuerId(e.detail.selectedOption.value)}
        >
          {cardIssuers.map((cardIssuer, idx) => (
            <Option key={idx} value={cardIssuer.id.toString()}>
              {cardIssuer.name}
            </Option>
          ))}
        </Select>
        <Input
          type="Text"
          onInput={(e: any) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <Input
          type="Number"
          onInput={(e: any) => setBankAccountNumber(e.target.value)}
          placeholder="Enter bank account number"
        />
        <Input
          type="Number"
          onInput={(e: any) => setLimit(e.target.value)}
          placeholder="Enter limit"
        />
      </FlexBox>
    </Dialog>
  )
}
