import React from "react";

const PaymentMethodBar = ({ mode, total, color }) => {
  const percentage = total > 0 ? (mode.total / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between items-start sm:items-center gap-2 mb-1.5">
        <span className="text-sm font-medium text-gray-700 shrink-0">
          {mode.name}
        </span>
        {/* Montant + nb paiements sur mobile : empilé */}
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-900 block sm:inline">
            {mode.total.toLocaleString()} FCFA
          </span>
          <span className="text-xs text-gray-500 sm:ml-1">
            ({mode.count} paiements)
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default PaymentMethodBar;
