import React, { useState } from "react"
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
import { transferMoney } from "../redux/features/bankAccounts/bankAccountsSlice"

interface TransferMoneyDialogProps {
  open: boolean
  onClose: () => void
}

export const TransferMoneyDialog: React.FC<TransferMoneyDialogProps> = ({
  open,
  onClose,
}) => {
  const [senderBankAccount, setSenderBankAccount] = useState(
    undefined as string | undefined,
  )
  const [receiverBankAccount, setReceiverBankAccount] = useState(
    undefined as string | undefined,
  )
  const [moneyAmount, setAmount] = useState("")
  const { bankAccounts } = useAppSelector((state) => state.bankAccounts)
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    const senderAccountNumber = Number(senderBankAccount)
    const receiverAccountNumber = Number(receiverBankAccount)
    const amount = Number(moneyAmount)
    dispatch(
      transferMoney({ senderAccountNumber, receiverAccountNumber, amount }),
    )
    onClose()
  }

  return (
    <Dialog
      open={open}
      headerText="Transfer money"
      footer={
        <div>
          <Button onClick={onClose}>Close</Button>
          <Button design="Emphasized" onClick={handleSubmit}>
            Transfer
          </Button>
        </div>
      }
    >
      <FlexBox direction={FlexBoxDirection.Column}>
        <Select
          value={senderBankAccount}
          onChange={(e: any) =>
            setSenderBankAccount(e.detail.selectedOption.value)
          }
        >
          {bankAccounts.map((bankAccount, idx) => (
            <Option key={idx} value={bankAccount.accountNumber}>
              {bankAccount.accountNumber}
            </Option>
          ))}
        </Select>

        <Select
          value={receiverBankAccount}
          onChange={(e: any) =>
            setReceiverBankAccount(e.detail.selectedOption.value)
          }
        >
          {bankAccounts.map((bankAccount, idx) => (
            <Option key={idx} value={bankAccount.accountNumber}>
              {bankAccount.accountNumber}
            </Option>
          ))}
        </Select>

        <Input
          type="Number"
          value={moneyAmount}
          onInput={(e: any) => setAmount(e.target.value)}
          placeholder="Enter number"
        />
      </FlexBox>
    </Dialog>
  )
}
