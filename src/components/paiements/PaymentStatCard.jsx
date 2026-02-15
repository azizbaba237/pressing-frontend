import React from "react";

const PaymentStatCard = ({ mode, amount, count }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 flex items-center space-x-1">
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </p>
          <p className="text-xl font-bold text-primary-600 mt-1">
            {amount.toLocaleString()} FCFA
          </p>
          <p className="text-xs text-gray-500 mt-1">{count} paiements</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatCard;
