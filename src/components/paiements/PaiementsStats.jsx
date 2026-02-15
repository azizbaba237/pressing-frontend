import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MODE_PAIEMENT_CHOICES } from "../../constants/paymentModes";
import PaymentStatCard from "../paiements/PaymentStatCard";

const PaiementsStats = ({ stats, payments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Carte Total */}
      <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total encaissé</p>
            <p className="text-2xl font-bold mt-1">
              {stats.total.toLocaleString()} FCFA
            </p>
            <p className="text-xs opacity-75 mt-1">
              {payments.length} paiements
            </p>
          </div>
          <FaMoneyBillWave className="text-4xl opacity-50" />
        </div>
      </div>

      {/* Cartes par mode de paiement */}
      {MODE_PAIEMENT_CHOICES.map((mode) => {
        const amount = stats[mode.value.toLowerCase()] || 0;
        const count = payments.filter(
          (p) => p.payment_method === mode.value,
        ).length;

        return (
          <PaymentStatCard
            key={mode.value}
            mode={mode}
            amount={amount}
            count={count}
          />
        );
      })}
    </div>
  );
};

export default PaiementsStats;
