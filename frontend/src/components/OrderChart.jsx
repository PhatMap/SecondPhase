import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomOrderTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Số lượng: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const OrderChart = ({ monthlyOrderCount }) => {
  if (!monthlyOrderCount) return null;

  const orderData = Object.entries(monthlyOrderCount).map(([month, value]) => ({ name: month, value }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Số lượng Đơn Hàng Theo Tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={orderData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomOrderTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
 
  </div>
  );
};

export default OrderChart;
