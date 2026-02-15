import React from "react";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import { FaMoneyBillWave } from "react-icons/fa";
import { getPaymentColumns } from "../../config/tableColumns";

const PaiementsTable = ({ payments, loading }) => {
  const columns = getPaymentColumns();

  if (loading) {
    return (
      <div className="card">
        <Loader text="Chargement des paiements..." />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <FaMoneyBillWave className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500">Aucun paiement trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <Table columns={columns} data={payments} loading={loading} />
    </div>
  );
};

export default PaiementsTable;
