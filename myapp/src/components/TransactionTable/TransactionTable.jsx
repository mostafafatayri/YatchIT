import React from 'react';
import './TransactionTable.scss';

const transactions = [
  { id: 1045, date: 'Sun Mar 24 2023', status: 'RECEIVED', customer: 'Lian Travis', purchased: 'Wireframing kit for Figma', revenue: '$248.99' },
  { id: 1046, date: 'Mon Apr 10 2023', status: 'RECEIVED', customer: 'Athan Travis', purchased: 'Mastering the Grid', revenue: '$158.99' },
  { id: 1047, date: 'Tue May 13 2023', status: 'REFUND', customer: 'Meloncho Berry', purchased: 'Wireframing kit for Figma', revenue: '$99.99' },
  { id: 1048, date: 'Wed Jun 17 2023', status: 'RECEIVED', customer: 'Lian Oneill', purchased: 'Wireframing kit for Figma', revenue: '$102.99' },
  { id: 1049, date: 'Thu Jul 23 2023', status: 'REFUND', customer: 'Monroe Bond', purchased: 'Mastering the Grid', revenue: '$248.99' },
  { id: 1050, date: 'Fri Aug 09 2023', status: 'PENDING', customer: 'Ricardo Jr', purchased: 'Wireframing kit for Figma', revenue: '$248.99' },
  { id: 1051, date: 'Sat Sep 29 2023', status: 'RECEIVED', customer: 'Evan Calvert', purchased: 'Mastering the Grid', revenue: '$116.99' },
  { id: 1052, date: 'Sun Oct 27 2023', status: 'PENDING', customer: 'Dustin Flom', purchased: 'Wireframing kit for Figma', revenue: '$58.99' },
  { id: 1053, date: 'Mon Nov 21 2023', status: 'RECEIVED', customer: 'Jason Mock', purchased: 'Mastering the Grid', revenue: '$157.99' },
  { id: 1054, date: 'Mon Dec 31 2023', status: 'RECEIVED', customer: 'Cristo Noal', purchased: 'Wireframing kit for Figma', revenue: '$229.99' },
];

const TransactionTable = () => {
  return (
    <div className="dashboard">
      <div className="widgets">
        <div className="widget">
          <h3>New Orders</h3>
          <p>157</p>
          <small>vs. 178 last period</small>
        </div>
        <div className="widget">
          <h3>New Orders Revenue</h3>
          <p>$1489.59</p>
          <small>vs. 12 last period</small>
        </div>
        <div className="widget">
          <h3>Avg. Order Revenue</h3>
          <p>$789.99</p>
          <small>vs. 12 last period</small>
        </div>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Date</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Purchased</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td><span className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
              <td>{transaction.customer}</td>
              <td>{transaction.purchased}</td>
              <td>{transaction.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
