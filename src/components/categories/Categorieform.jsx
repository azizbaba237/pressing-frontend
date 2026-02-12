import React from "react";

const CategorieForm = ({
  formData,
  errors,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la catégorie *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={`input-field ${errors.name ? "border-red-500" : ""}`}
          placeholder="Ex: Nettoyage à sec, Repassage, Blanchisserie..."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
          placeholder="Description de la catégorie..."
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="categorie-actif"
          checked={formData.actif}
          onChange={(e) => onChange("actif", e.target.checked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label
          htmlFor="categorie-actif"
          className="ml-2 block text-sm text-gray-900"
        >
          Catégorie active
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

export default CategorieForm;
