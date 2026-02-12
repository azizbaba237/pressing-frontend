import { useState } from "react";
import { serviceService, categorieService } from "../services/api";
export const useServicesData = ({ searchTerm, filterCategorie, showAlert }) => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filterCategorie) params.categorie = filterCategorie;

      const response = await serviceService.getAll(params);
      setServices(response.data.results || response.data);
    } catch (error) {
      showAlert(error, "Erreur lors du chargement des services");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categorieService.getAll();
      setCategory(response.data.results || response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
    }
  };

  const createService = async (formData) => {
    try {
      await serviceService.create(formData);
      showAlert("success", "Service ajouté avec succès");
      await fetchServices();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la création",
      );
      throw error;
    }
  };

  const updateService = async (id, formData) => {
    try {
      await serviceService.update(id, formData);
      showAlert("success", "Service modifié avec succès");
      await fetchServices();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la modification",
      );
      throw error;
    }
  };

  const deleteService = async (id) => {
    try {
      await serviceService.delete(id);
      showAlert("success", "Service supprimé avec succès");
      await fetchServices();
    } catch (error) {
      showAlert("error", "Erreur lors de la suppression");
      throw error;
    }
  };

  const createCategorie = async (formData) => {
    try {
      await categorieService.create(formData);
      showAlert("success", "Catégorie ajoutée avec succès");
      await fetchCategories();
      await fetchServices();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la création",
      );
      throw error;
    }
  };

  const updateCategorie = async (id, formData) => {
    try {
      await categorieService.update(id, formData);
      showAlert("success", "Catégorie modifiée avec succès");
      await fetchCategories();
      await fetchServices();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la modification",
      );
      throw error;
    }
  };

  const deleteCategorie = async (id) => {
    try {
      await categorieService.delete(id);
      showAlert("success", "Catégorie supprimée avec succès");
      await fetchCategories();
      await fetchServices();
    } catch (error) {
      showAlert("error", "Erreur lors de la suppression");
      throw error;
    }
  };

  return {
    services,
    category,
    loading,
    fetchServices,
    fetchCategories,
    createService,
    updateService,
    deleteService,
    createCategorie,
    updateCategorie,
    deleteCategorie,
  };
};
