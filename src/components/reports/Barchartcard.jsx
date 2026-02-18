import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartCard = ({
  title,
  data,
  dataKey,
  color = "#3B82F6",
  formatter,
}) => {
  const defaultFormatter = (value) => [`${value.toLocaleString()}`, dataKey];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip formatter={formatter || defaultFormatter} />
          <Legend />
          <Bar
            dataKey={dataKey}
            fill={color}
            name={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
