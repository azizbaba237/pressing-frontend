import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "../../constants/reports";

const PieChartCard = ({ title, data }) => {
  return (
    <div className="card">
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="42%"
              labelLine={false}
              label={false}
              outerRadius="60%"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, name]}
              contentStyle={{
                fontSize: "12px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            {/* Légende en bas, wrappable */}
            <Legend
              verticalAlign="bottom"
              align="center"
              height={70}
              wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
              iconType="circle"
              iconSize={8}
              formatter={(value, entry) => {
                const total = data.reduce((sum, d) => sum + d.value, 0);
                const pct =
                  total > 0
                    ? ((entry.payload.value / total) * 100).toFixed(0)
                    : 0;
                return `${value} (${pct}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartCard;
