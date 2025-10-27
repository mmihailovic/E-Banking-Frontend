import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loadBankAccounts, setSelectedBankAccountNumber } from '../redux/features/user/userSlice';
import { AnalyticalTable } from "@ui5/webcomponents-react";

export const AllUsersBankAccounts: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { bankAccounts } = useAppSelector((state) => state.user);

  const columns = [
    { Header: "Account Number", accessor: "accountNumber" },
    { Header: "Balance", accessor: "balance" },
    { Header: "Available Balance", accessor: "availableBalance" },
  ];

  const handleRowClick = (event: any) => {
    const selectedBankAccount = event.detail.row.original;
    dispatch(setSelectedBankAccountNumber(selectedBankAccount.accountNumber))
    navigate('/bank-account')
  };

  useEffect(()=>{
    dispatch(loadBankAccounts())
  }, [dispatch])


  return (
      <AnalyticalTable
      data={bankAccounts}
      columns={columns}
      style={{ height: "400px", width:"700px" }}
      scaleWidthMode="Smart"
      onRowClick={handleRowClick}
    />
  );
};

export default AllUsersBankAccounts;