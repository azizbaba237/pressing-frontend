import React from "react";

const PaymentMethodBar = ({ mode, total, color }) => {
  const percentage = total > 0 ? (mode.total / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{mode.name}</span>
        <span className="text-sm font-semibold text-gray-900">
          {mode.total.toLocaleString()} FCFA ({mode.count} paiements)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PaymentMethodBar;
