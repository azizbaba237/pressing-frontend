import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import CategorieForm from "./Categorieform ";

const CategorieModal = ({ isOpen, onClose, onSubmit, category }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actif: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        actif: category.actif,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        actif: true,
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom de la catégorie est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ lorsqu'on modifie la valeur
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Modifier la catégorie" : "Nouvelle catégorie"}
      size="md"
    >
      <CategorieForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isEditing={!!category}
      />
    </Modal>
  );
};

export default CategorieModal;
