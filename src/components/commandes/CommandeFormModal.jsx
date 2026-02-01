import React from "react";
import Modal from "../common/Modal";
import { FaPlus, FaTrash } from "react-icons/fa";

/**
 * Composant Modal de création de commande
 * Fichier: src/components/commandes/CommandeFormModal.jsx
 *
 * Formulaire complet pour créer une nouvelle commande avec articles
 */
const CommandeFormModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  clients,
  services,
  onSubmit,
  addArticle,
  removeArticle,
  updateArticle,
  calculateTotal,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle commande"
      size="lg"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Informations de base */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sélection du client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client *
            </label>
            <select
              required
              value={formData.customer}
              onChange={(e) =>
                setFormData({ ...formData, customer: e.target.value })
              }
              className="input-field"
            >
              <option value="">Sélectionnez un client</option>
              {clients.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.first_name} {customer.last_name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Date de promesse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de promesse *
            </label>
            <input
              type="datetime-local"
              required
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
              className="input-field"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            rows="2"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="input-field"
            placeholder="Instructions spéciales, remarques..."
          ></textarea>
        </div>

        {/* Articles */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Articles *
            </label>
            <button
              type="button"
              onClick={addArticle}
              className="text-primary-600 hover:text-primary-800 text-sm flex items-center space-x-1"
            >
              <FaPlus />
              <span>Ajouter un article</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 items-start p-3 bg-gray-50 rounded-lg"
              >
                {/* Service */}
                <div className="col-span-5">
                  <select
                    required
                    value={item.service_id}
                    onChange={(e) =>
                      updateArticle(index, "service_id", e.target.value)
                    }
                    className="input-field"
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.price} FCFA
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantité */}
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    required
                    value={item.quantity}
                    onChange={(e) =>
                      updateArticle(index, "quantity", e.target.value)
                    }
                    className="input-field"
                    placeholder="Qté"
                  />
                </div>

                {/* Description */}
                <div className="col-span-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateArticle(index, "description", e.target.value)
                    }
                    className="input-field"
                    placeholder="Description (couleur, état...)"
                  />
                </div>

                {/* Bouton supprimer */}
                <div className="col-span-1 flex items-center justify-center">
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArticle(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total estimé */}
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">
              Total estimé:
            </span>
            <span className="text-2xl font-bold text-primary-600">
              {calculateTotal().toLocaleString()} FCFA
            </span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Annuler
          </button>
          <button type="submit" className="btn-primary">
            Créer la commande
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CommandeFormModal;
