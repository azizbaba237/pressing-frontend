import React from "react";
import Modal from "../common/Modal";
import { FaMoneyBillWave } from "react-icons/fa";
import { STATUT_CHOICES, STATUT_COLORS } from "../../constants/commandes";
import CommandeInfo from "./Commandeinfo";
import CommandeItems from "./Commandeitems";
import CommandeFinancial from "./Commandefinancial";
import CommandePayments from "./Commandepayments";

/**
 * Composant Modal de détails d'une commande
 * Fichier: src/components/commandes/CommandeDetailModal.jsx
 *
 * Affiche toutes les informations d'une commande : client, articles, paiements
 * Permet de changer le statut et d'ajouter des paiements
 */
const CommandeDetailModal = ({
  isOpen,
  onClose,
  commande,
  statutChoices,
  modePaiementChoices,
  onChangerStatut,
  onOpenPaiement,
}) => {
  if (!commande) return null;

  const getStatutBadge = (status) => {
    const statutInfo = STATUT_CHOICES.find((s) => s.value === status);
    const colorClass = STATUT_COLORS[statutInfo?.color] || "badge-secondary";

    return (
      <span className={`${colorClass} inline-flex items-center`}>
        {statutInfo?.label || status}
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Commande ${commande.order_id}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Informations générales */}
        <CommandeInfo commande={commande} getStatutBadge={getStatutBadge} />

        {/* Articles */}
        <CommandeItems items={commande.items} />

        {/* Résumé financier */}
        <CommandeFinancial commande={commande} />

        {/* Paiements */}
        {commande.payments && commande.payments.length > 0 && (
          <CommandePayments
            payments={commande.payments}
            modePaiementChoices={modePaiementChoices}
          />
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onOpenPaiement}
            className="btn-primary flex items-center space-x-2"
            disabled={commande.is_paid}
          >
            <FaMoneyBillWave />
            <span>Ajouter un paiement</span>
          </button>

          {commande.status !== "DELIVERED" && (
            <select
              value={commande.status}
              onChange={(e) => onChangerStatut(commande.id, e.target.value)}
              className="input-field"
            >
              {statutChoices.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CommandeDetailModal;
