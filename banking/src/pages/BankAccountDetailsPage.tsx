import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loadBankAccountDetails } from '../redux/features/user/userSlice';
import { Table, TableRow, TableHeaderCell, TableCell, Title, Button } from "@ui5/webcomponents-react";
import { TransactionsForBankAccount } from '../components/TransactionsForBankAccount';
import { TransferMoneyDialog } from '../components/TransferMoneyDialog';


export const BankAccountDetailsPage: React.FC = () => {
  const { selectedBankAccount, selectedBankAccountNumber } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(()=>{
    dispatch(loadBankAccountDetails(selectedBankAccountNumber!!))
  }, [dispatch])


  return (
    <div style={{ padding: "20px", width:"100vw" }}>
        <Button onClick={() => setOpenDialog(true)}>Create transaction</Button>
        <TransferMoneyDialog open={openDialog} onClose={()=>setOpenDialog(false)}></TransferMoneyDialog>
      <div style={{display:"flex"}}>
        <Title>Account details</Title>
      <Table style={{ width: "400px", justifyContent:"right", alignItems:"right" }}>
        <TableRow style={{display: "flex"}}>
            <TableHeaderCell>Account Number</TableHeaderCell>
            <TableCell>{selectedBankAccount?.accountNumber}</TableCell>
        </TableRow>
        <TableRow style={{display: "flex"}}>
            <TableHeaderCell>Balance</TableHeaderCell>
            <TableCell>{selectedBankAccount?.balance}</TableCell>
        </TableRow>
        <TableRow style={{display: "flex"}}>
            <TableHeaderCell>Available balance</TableHeaderCell>
            <TableCell>{selectedBankAccount?.availableBalance}</TableCell>
        </TableRow>
        <TableRow style={{display: "flex"}}>
            <TableHeaderCell>Creation date</TableHeaderCell>
            <TableCell>{selectedBankAccount? new Date(selectedBankAccount!!.creationDate).toLocaleDateString("en-de"): <></>}</TableCell>
        </TableRow>
        <TableRow style={{display: "flex"}}>
            <TableHeaderCell>Currency</TableHeaderCell>
            <TableCell>{selectedBankAccount?.currencyDTO.name}</TableCell>
        </TableRow>
        <TableRow style={{display: "flex"}}>
            <TableHeaderCell>Active</TableHeaderCell>
            <TableCell>{selectedBankAccount?.active? 'Yes': 'No'}</TableCell>
        </TableRow>
      </Table>
      <TransactionsForBankAccount/>
      </div>
    </div>
  );
};
export default BankAccountDetailsPage;