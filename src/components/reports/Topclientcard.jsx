import React from "react";

const TopClientCard = ({ customer, rank, color }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: color }}
        >
          {rank}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{customer.name}</p>
          <p className="text-sm text-gray-500">{customer.phone}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-green-600">
          {customer.total_amount.toLocaleString()} FCFA
        </p>
        <p className="text-sm text-gray-500">
          {customer.total_item} commande(s)
        </p>
      </div>
    </div>
  );
};

export default TopClientCard;
