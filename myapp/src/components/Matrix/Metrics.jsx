import React from 'react';
import './Metrics.scss';

const Metrics = () => {
  return (
    <div className="metrics">
      <div className="metric">
        <h3>New Orders</h3>
        <p>157 vs. 178 last period</p>
      </div>
      <div className="metric">
        <h3>New Orders Revenue</h3>
        <p>$1489.59 vs. 12 last period</p>
      </div>
      <div className="metric">
        <h3>Avg. Order Revenue</h3>
        <p>$789.99 vs. 12 last period</p>
      </div>
    </div>
  );
};

export default Metrics;
