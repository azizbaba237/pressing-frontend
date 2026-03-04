import React from "react";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";
import ClientInfo from "./ClientInfo";
import ClientStats from "./ClientStats";

const ClientDetailsModal = ({ isOpen, onClose, client, stats }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du client"
      size="lg"
    >
      {client && (
        <div className="space-y-6">
          <ClientInfo client={client} />

          {stats ? (
            <ClientStats stats={stats} />
          ) : (
            <Loader size="small" text="Chargement des statistiques..." />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ClientDetailsModal;
