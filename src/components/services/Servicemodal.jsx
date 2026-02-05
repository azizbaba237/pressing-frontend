import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import ServiceForm from "./Serviceform";

const ServiceModal = ({ isOpen, onClose, onSubmit, service, category }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    estimate_time: 24,
    actif: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        category: service.category,
        description: service.description || "",
        price: service.price,
        estimate_time: service.estimate_time,
        actif: service.actif,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        estimate_date: 24,
        actif: true,
      });
    }
    setErrors({});
  }, [service, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du service est requis";
    }

    if (!formData.category) {
      newErrors.category = "Veuillez sélectionner une catégorie";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0";
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
      title={service ? "Modifier le service" : "Nouveau service"}
      size="md"
    >
      <ServiceForm
        formData={formData}
        errors={errors}
        category={category}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isEditing={!!service}
      />
    </Modal>
  );
};

export default ServiceModal;
