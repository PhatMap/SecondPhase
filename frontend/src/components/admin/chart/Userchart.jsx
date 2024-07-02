import React, { Fragment } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Userchart = ({ userData = { storekeeper: 20, customer: 80 } }) => {
  const data = [
    { name: "Storekeeper", value: userData.storekeeper },
    { name: "Customer", value: userData.customer },
  ];

  const COLORS = ["#0088FE", "#00C49F"];
  const icons = ["fa fa-shopping-bag", "fa fa-user"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderCusomizedLegend = (props) => {
    const { payload } = props;

    return (
      <ul className="pie-chart">
        {payload.map((entry, index) => (
          <div
            style={{
              color: COLORS[index % COLORS.length],
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className={`${icons[index]} `}></i>
            <li key={`item-${index}`}>
              {entry.value}: {entry.payload.value}
            </li>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div className="pie-chart-container">
      <h1>Số Lượng Người Dùng</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart title="Số lượng người dùng">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={renderCusomizedLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Userchart;
