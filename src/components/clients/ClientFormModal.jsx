import React, { useState } from "react";
import Modal from "../../components/common/Modal";

const ClientFormModal = ({
  isOpen,
  onClose,
  selectedClient,
  formData,
  onChange,
  onSubmit,
}) => {
  // Erreurs locales pour chaque champ
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(""); // Erreur globale pour validation

  // Fonction wrapper pour handleSubmit pour gérer les erreurs inline
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(""); // ← reset

    // Reset des erreurs avant validation
    setErrors({});

    // On appelle le handleSubmit du hook
    try {
      await onSubmit(e, selectedClient);
    } catch (err) {
      if (err?.field === "phone") {
        setErrors({ phone: err.message });
      } else if (err?.field === "validation") {
        setGlobalError(err.message); // ← message global
      } else {
        setGlobalError("Une erreur est survenue.");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedClient ? "Modifier le client" : "Nouveau client"}
      size="md"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* ✅ Message d'erreur global visible */}
        {globalError && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded text-sm">
            {globalError}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {/* Prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <input
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => {
                onChange("first_name", e.target.value);
                setErrors({ ...errors, first_name: "" });
              }}
              className="input-field"
              placeholder="Jean"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              required
              value={formData.last_name}
              onChange={(e) => {
                onChange("last_name", e.target.value);
                setErrors({ ...errors, last_name: "" });
              }}
              className="input-field"
              placeholder="Dupont"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => {
              onChange("phone", e.target.value);
              setErrors({ ...errors, phone: "" });
            }}
            className="input-field"
            placeholder="+237 6XX XXX XXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              onChange("email", e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            className="input-field"
            placeholder="jean.dupont@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <textarea
            rows="3"
            value={formData.adresse}
            onChange={(e) => {
              onChange("adresse", e.target.value);
              setErrors({ ...errors, adresse: "" });
            }}
            className="input-field"
            placeholder="Adresse complète du client"
          ></textarea>
          {errors.adresse && (
            <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>
          )}
        </div>

        {/* Client actif */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="actif"
            checked={formData.actif}
            onChange={(e) => onChange("actif", e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="actif" className="ml-2 block text-sm text-gray-900">
            Client actif
          </label>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Annuler
          </button>
          <button type="submit" className="btn-primary">
            {selectedClient ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ClientFormModal;
