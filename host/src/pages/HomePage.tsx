import React, { lazy, Suspense } from 'react';
import { Title } from "@ui5/webcomponents-react";

const AllUsersBankAccounts = lazy(() => import("banking/AllUsersBankAccounts"));

export const HomePage: React.FC = () => {

  return (
    <div>
      <Title>Bank Accounts</Title>
      <Suspense fallback={<div>Loading...</div>}>
      <AllUsersBankAccounts/>
      </Suspense>
    </div>
  );
};