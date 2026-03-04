import React from "react";

const TopClientCard = ({ customer, rank, color }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      {/* Rang + infos */}
      <div className="flex items-center space-x-3 min-w-0">
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0"
          style={{ backgroundColor: color }}
        >
          {rank}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
            {customer.name}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">{customer.phone}</p>
        </div>
      </div>

      {/* Montant + commandes */}
      <div className="text-right shrink-0">
        <p className="font-bold text-green-600 text-sm sm:text-base">
          {customer.total_amount.toLocaleString()}
          <span className="text-xs font-normal ml-0.5">FCFA</span>
        </p>
        <p className="text-xs text-gray-500">
          {customer.total_item} commande(s)
        </p>
      </div>
    </div>
  );
};

export default TopClientCard;
