import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loadTransactions } from '../redux/features/user/userSlice';
import { AnalyticalTable } from "@ui5/webcomponents-react";

export const TransactionsForBankAccount = () => {
  const { transactionsForBankAccount, selectedBankAccountNumber } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()

  const columns = [
    { Header: "Sender Account Number", accessor: "senderAccountNumber" },
    { Header: "Receiver Account Number", accessor: "receiverAccountNumber" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Status", accessor: "paymentStatus"},
    { Header: "Creation time", accessor: "transactionCreationTime"},
    { Header: "Execution time", accessor: "transactionExecutionTime"}
  ];

  useEffect(()=>{
    dispatch(loadTransactions(selectedBankAccountNumber!!))
  }, [dispatch])


  return (
    <div style={{paddingLeft: "100px", display: "flex", justifyContent:"center", alignItems:"center", width:"vw" }}>
      <AnalyticalTable
      data={transactionsForBankAccount}
      columns={columns}
      header="Payments"
      style={{ height: "400px" }}
      scaleWidthMode="Smart"
    />
    </div>
  );
};