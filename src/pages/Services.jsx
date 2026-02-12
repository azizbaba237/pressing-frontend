import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
// import { serviceService, categorieService } from "../services/api";
import Alert from "../components/common/Alert";
import ServicesHeader from "../components/services/ServicesHeader";
import ServicesFilters from "../components/services/ServicesFilters";
import CategoriesStats from "../components/categories/Categoriesstats";
import ServicesTable from "../components/services/ServicesTable";
import CategoriesTable from "../components/categories/Categoriestable";
import ServiceModal from "../components/services/Servicemodal";
import CategorieModal from "../components/categories/Categoriemodal";
import {useServicesData}  from "../hooks/useservicesdata";
import { useAlert } from "../hooks/usealert";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategorieModal, setShowCategorieModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const { alert, showAlert, closeAlert } = useAlert();

  const {
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
  } = useServicesData({ searchTerm, filterCategorie, showAlert });

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [searchTerm, filterCategorie]);

  // Handlers pour les services
  const handleServiceSubmit = async (formData) => {
    try {
      if (selectedService) {
        await updateService(selectedService.id, formData);
      } else {
        await createService(formData);
      }
      setShowServiceModal(false);
      setSelectedService(null);
    } catch (error) {
      // Erreur gérée dans le hook
      console.error("Erreur :", error);
    }
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleDeleteService = async (service) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer le service "${service.name}" ?`,
      )
    ) {
      await deleteService(service.id);
    }
  };

  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  // Handlers pour les catégories
  const handleCategorieSubmit = async (formData) => {
    try {
      if (selectedCategorie) {
        await updateCategorie(selectedCategorie.id, formData);
      } else {
        await createCategorie(formData);
      }
      setShowCategorieModal(false);
      setSelectedCategorie(null);
    } catch (error) {
      // Erreur gérée dans le hook
      console.error("Erreur:", error);
    }
  };

  const handleEditCategorie = (category) => {
    setSelectedCategorie(category);
    setShowCategorieModal(true);
  };

  const handleDeleteCategorie = async (category) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? Tous les services associés seront également supprimés.`,
      )
    ) {
      await deleteCategorie(category.id);
    }
  };

  const handleCloseCategorieModal = () => {
    setShowCategorieModal(false);
    setSelectedCategorie(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <ServicesHeader
          onNewService={() => setShowServiceModal(true)}
          onNewCategorie={() => setShowCategorieModal(true)}
        />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}

        <ServicesFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategorie={filterCategorie}
          onFilterChange={setFilterCategorie}
          category={category}
        />

        <CategoriesStats
          category={category}
          services={services}
          onCategoryClick={(catId) => setFilterCategorie(catId.toString())}
        />

        <ServicesTable
          services={services}
          loading={loading}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
        />

        <CategoriesTable
          category={category}
          onEdit={handleEditCategorie}
          onDelete={handleDeleteCategorie}
        />

        <ServiceModal
          isOpen={showServiceModal}
          onClose={handleCloseServiceModal}
          onSubmit={handleServiceSubmit}
          service={selectedService}
          category={category}
        />

        <CategorieModal
          isOpen={showCategorieModal}
          onClose={handleCloseCategorieModal}
          onSubmit={handleCategorieSubmit}
          category={selectedCategorie}
        />
      </div>
    </MainLayout>
  );
};

export default Services;
