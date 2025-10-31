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
import {
  createBusinessBankAccount,
  createCurrentBankAccount,
  createForeignBankAccount,
} from "../redux/features/bankAccounts/bankAccountsSlice"

interface CreateBankAccountDialogProps {
  open: boolean
  onClose: () => void
}

export const CreateBankAccountDialog: React.FC<
  CreateBankAccountDialogProps
> = ({ open, onClose }) => {
  const { currencies } = useAppSelector((state) => state.credits)
  const [currencyId, setCurrencyId] = useState(0)
  const [bankAccountType, setBankAccountType] = useState("CURRENT")
  const [currentBankAccountType, setCurrentBankAccountType] =
    useState("PERSONAL")
  const [identifier, setIdentifier] = useState(0)
  const [maintenancePrice, setMaintenancePrice] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setCurrencyId(currencies[0]?.id)
  }, [currencies])

  const handleSubmit = () => {
    if (bankAccountType == "CURRENT")
      dispatch(
        createCurrentBankAccount({
          JMBG: identifier,
          accountType: currentBankAccountType,
          maintenancePrice,
        }),
      )
    else if (bankAccountType == "FOREIGN")
      dispatch(
        createForeignBankAccount({
          JMBG: identifier,
          currencyId,
          maintenancePrice,
        }),
      )
    else dispatch(createBusinessBankAccount({ TIN: identifier }))
    onClose()
  }

  return (
    <Dialog
      open={open}
      headerText="Create bank account"
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
        <Select
          onChange={(e: any) =>
            setBankAccountType(e.detail.selectedOption.value)
          }
        >
          <Option key={"CURRENT"} value={"CURRENT"}>
            Current
          </Option>
          <Option key={"FOREIGN"} value={"FOREIGN"}>
            Foreign
          </Option>
          <Option key={"BUSINESS"} value={"BUSINESS"}>
            Business
          </Option>
        </Select>
        <Input
          type="Text"
          onInput={(e: any) => setIdentifier(e.target.value)}
          placeholder={
            bankAccountType == "CURRENT" || bankAccountType == "FOREIGN"
              ? "JMBG"
              : "TIN"
          }
        />
        {bankAccountType == "CURRENT" ? (
          <Select
            onChange={(e: any) =>
              setCurrentBankAccountType(e.detail.selectedOption.value)
            }
          >
            <Option key={"PERSONAL"} value={"PERSONAL"}>
              Personal
            </Option>
            <Option key={"STUDENT"} value={"STUDENT"}>
              Student
            </Option>
            <Option key={"PENSION"} value={"PENSION"}>
              Pension
            </Option>
            <Option key={"SAVING"} value={"SAVING"}>
              SAVING
            </Option>
          </Select>
        ) : (
          <></>
        )}
        {bankAccountType == "CURRENT" || bankAccountType == "FOREIGN" ? (
          <Input
            type="Number"
            onInput={(e: any) => setMaintenancePrice(e.target.value)}
            placeholder="Maintenance price"
          />
        ) : (
          <></>
        )}
      </FlexBox>
    </Dialog>
  )
}
