import React from 'react';

import Metrics from '../../components/Matrix/Metrics'
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import AddListingButton from '../../components/AddListingButton/AddListingButton';


const Dashboard = () => {
  return (
    <div className="dashboard-page">
     
      <Metrics />
      <AddListingButton />
      <TransactionTable />
    </div>
  );
};

export default Dashboard;
