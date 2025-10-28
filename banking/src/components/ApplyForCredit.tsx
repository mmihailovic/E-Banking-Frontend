import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import {
  Button,
  Dialog,
  Select,
  Option,
  Input,
  FlexBox,
  FlexBoxDirection,
  CheckBox,
} from "@ui5/webcomponents-react"
import { applyForCredit } from "../redux/features/credits/creditsSlice"

interface ApplyForCreditDialogProps {
  open: boolean
  onClose: () => void
}

export const ApplyForCreditDialog: React.FC<ApplyForCreditDialogProps> = ({
  open,
  onClose,
}) => {
  const { selectedCreditType, currencies } = useAppSelector(
    (state) => state.credits,
  )
  const { bankAccounts } = useAppSelector((state) => state.bankAccounts)
  const [amount, setAmount] = useState(0)
  const [loanPurpose, setLoanPurpose] = useState("")
  const [salary, setSalary] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [permanentEmployee, setPermanentEmployee] = useState(false)
  const [currentEmploymentPeriod, setCurrentEmploymentPeriod] = useState(0)
  const [loanTerm, setLoanTerm] = useState(0)
  const [bankAccountNumber, setBankAccountNumber] = useState(0)
  const [currencyId, setCurrencyId] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setCurrencyId(currencies[0]?.id)
  }, [currencies])

  useEffect(() => {
    setBankAccountNumber(Number(bankAccounts[0]?.accountNumber))
  }, [bankAccounts])

  const handleSubmit = () => {
    const creditTypeId = selectedCreditType!.id
    dispatch(
      applyForCredit({
        creditTypeId,
        amount,
        currencyId,
        loanPurpose,
        salary,
        phoneNumber,
        permanentEmployee,
        currentEmploymentPeriod,
        loanTerm,
        bankAccountNumber,
      }),
    )
    onClose()
  }

  return (
    <Dialog
      open={open}
      headerText="Apply for credit"
      footer={
        <div>
          <Button onClick={onClose}>Close</Button>
          <Button design="Emphasized" onClick={handleSubmit}>
            Apply
          </Button>
        </div>
      }
    >
      <FlexBox direction={FlexBoxDirection.Column} style={{ gap: "1rem" }}>
        <Input
          type="Number"
          onInput={(e: any) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <Select
          onChange={(e: any) =>
            setCurrencyId(Number(e.detail.selectedOption.value))
          }
        >
          {currencies.map((currency, idx) => (
            <Option key={idx} value={currency.id.toString()}>
              {currency.name}
            </Option>
          ))}
        </Select>

        <Input
          onInput={(e: any) => setLoanPurpose(e.target.value)}
          placeholder="Enter loan purpose"
        />

        <Input
          type="Number"
          onInput={(e: any) => setSalary(e.target.value)}
          placeholder="Enter salary"
        />

        <Input
          onInput={(e: any) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />

        <CheckBox
          checked={permanentEmployee}
          text="Permanent employee"
          onChange={(e: any) => setPermanentEmployee(e.target.checked)}
        />
        {permanentEmployee && (
          <Input
            type="Number"
            onInput={(e: any) => setCurrentEmploymentPeriod(e.target.value)}
            placeholder="Enter current employment period in months"
          />
        )}

        <Input
          type="Number"
          onInput={(e: any) => setLoanTerm(e.target.value)}
          placeholder="Enter loan term in months"
        />

        <Select
          onChange={(e: any) =>
            setBankAccountNumber(e.detail.selectedOption.value)
          }
        >
          {bankAccounts.map((bankAccount, idx) => (
            <Option key={idx} value={bankAccount.accountNumber}>
              {bankAccount.accountNumber}
            </Option>
          ))}
        </Select>
      </FlexBox>
    </Dialog>
  )
}
