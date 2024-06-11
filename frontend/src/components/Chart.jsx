import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Tổng: ${payload[0].value.toFixed(2)} VND`}</p>
      </div>
    );
  }

  return null;
};

const ChartComponent = ({ monthlyRevenue }) => {
  if (!monthlyRevenue) return null;

  const revenueData = Object.entries(monthlyRevenue).map(([month, value]) => ({ name: month, value }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Doanh thu Theo Tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={revenueData}
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#03fc39" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
