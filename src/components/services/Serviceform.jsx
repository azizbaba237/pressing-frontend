import React from "react";

const ServiceForm = ({
  formData,
  errors,
  category,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du service *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={`input-field ${errors.name ? "border-red-500" : ""}`}
          placeholder="Ex: Nettoyage chemise, Repassage pantalon..."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie *
        </label>
        <select
          required
          value={formData.category}
          onChange={(e) => onChange("category", e.target.value)}
          className={`input-field ${errors.category ? "border-red-500" : ""}`}
        >
          <option value="">Sélectionnez une catégorie</option>
          {category
            .filter((cat) => cat.actif)
            .map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="input-field"
          placeholder="Description détaillée du service..."
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix (FCFA) *
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            value={formData.price}
            onChange={(e) => onChange("price", e.target.value)}
            className={`input-field ${errors.price ? "border-red-500" : ""}`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée estimée (heures) *
          </label>
          <input
            type="number"
            min="1"
            required
            value={formData.estimate_time}
            onChange={(e) => onChange("estimate_time", e.target.value)}
            className="input-field"
            placeholder="24"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="service-actif"
          checked={formData.actif}
          onChange={(e) => onChange("actif", e.target.checked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label
          htmlFor="service-actif"
          className="ml-2 block text-sm text-gray-900"
        >
          Service actif
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Annuler
        </button>
        <button type="submit" className="btn-primary">
          {isEditing ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
