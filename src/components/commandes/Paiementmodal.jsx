import React from "react";
import Modal from "../common/Modal";

/**
 * Composant Modal d'ajout de paiement
 * Fichier: src/components/commandes/PaiementModal.jsx
 *
 * Formulaire pour ajouter un nouveau paiement à une commande
 */
const PaiementModal = ({
  isOpen,
  onClose,
  commande,
  paiementData,
  setPaiementData,
  modePaiementChoices,
  onSubmit,
}) => {
  // Calculer le reste à payer
  const resteAPayer = commande
    ? parseFloat(commande.total_amount) - parseFloat(commande.amount_paid)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter un paiement"
      size="md"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Affichage du reste à payer */}
        {commande && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600">Reste à payer:</p>
            <p className="text-2xl font-bold text-blue-600">
              {resteAPayer.toLocaleString()} FCFA
            </p>
          </div>
        )}

        {/* Montant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Montant *
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max={resteAPayer}
            required
            value={paiementData.amount}
            onChange={(e) =>
              setPaiementData({ ...paiementData, amount: e.target.value })
            }
            className="input-field"
            placeholder="Montant en FCFA"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum: {resteAPayer.toLocaleString()} FCFA
          </p>
        </div>

        {/* Mode de paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mode de paiement *
          </label>
          <select
            required
            value={paiementData.payment_method}
            onChange={(e) =>
              setPaiementData({
                ...paiementData,
                payment_method: e.target.value,
              })
            }
            className="input-field"
          >
            {modePaiementChoices.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        {/* Référence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Référence
          </label>
          <input
            type="text"
            value={paiementData.reference}
            onChange={(e) =>
              setPaiementData({
                ...paiementData,
                reference: e.target.value,
              })
            }
            className="input-field"
            placeholder="Numéro de transaction, chèque..."
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            rows="2"
            value={paiementData.notes}
            onChange={(e) =>
              setPaiementData({ ...paiementData, notes: e.target.value })
            }
            className="input-field"
            placeholder="Remarques sur le paiement..."
          ></textarea>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Annuler
          </button>
          <button type="submit" className="btn-primary">
            Enregistrer le paiement
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PaiementModal;
