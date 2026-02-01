import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  commandeService,
  clientService,
  serviceService,
} from "../services/api";
import Alert from "../components/common/Alert";
import CommandesHeader from "../components/commandes/CommandesHeader";
import CommandesFilters from "../components/commandes/CommandesFilters";
import CommandesStats from "../components/commandes/CommandesStats";
import CommandesTable from "../components/commandes/CommandesTable";
import CommandeFormModal from "../components/commandes/CommandeFormModal";
import CommandeDetailModal from "../components/commandes/CommandeDetailModal";
import PaiementModal from "../components/commandes/PaiementModal";
import { STATUT_CHOICES, MODE_PAIEMENT_CHOICES } from "../constants/commandes";

const Commandes = () => {
  // États principaux
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // États des modales
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  // États des filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("");

  // État des alertes
  const [alert, setAlert] = useState(null);

  // État du formulaire de commande
  const [formData, setFormData] = useState({
    customer: "",
    due_date: "",
    notes: "",
    items: [{ service_id: "", quantity: 1, description: "" }],
  });

  // État du formulaire de paiement
  const [paiementData, setPaiementData] = useState({
    amount: "",
    payment_method: "CASH",
    reference: "",
    notes: "",
  });

  // Chargement initial des données
  useEffect(() => {
    fetchCommandes();
    fetchClients();
    fetchServices();
  }, [searchTerm, filterStatut]);

  // ========== Fonctions de récupération des données ==========

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filterStatut) params.status = filterStatut;

      const response = await commandeService.getAll(params);
      setCommandes(response.data.results || response.data);
    } catch (error) {
      showAlert("error", "Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await clientService.getAll({ actif: true });
      setClients(response.data.results || response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des clients:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAll({ actif: true });
      setServices(response.data.results || response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des services:", error);
    }
  };

  // ========== Gestion de la commande ==========

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.customer) {
      showAlert("error", "Veuillez sélectionner un client");
      return;
    }

    if (!formData.due_date) {
      showAlert("error", "Veuillez sélectionner une date de promesse");
      return;
    }

    if (formData.items.length === 0 || !formData.items[0].service_id) {
      showAlert("error", "Veuillez ajouter au moins un article");
      return;
    }

    try {
      await commandeService.create(formData);
      showAlert("success", "Commande créée avec succès");
      setShowModal(false);
      resetForm();
      fetchCommandes();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la création",
      );
    }
  };

  const handleDelete = async (order) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer la commande ${order.order_id} ?`,
      )
    ) {
      try {
        await commandeService.delete(order.id);
        showAlert("success", "Commande supprimée avec succès");
        fetchCommandes();
      } catch (error) {
        showAlert("error", "Erreur lors de la suppression");
      }
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await commandeService.getById(order.id);
      setSelectedCommande(response.data);
      setShowDetailModal(true);
    } catch (error) {
      showAlert("error", "Erreur lors du chargement des détails");
    }
  };

  // ========== Gestion du statut ==========

  const handleChangerStatut = async (commandeId, nouveauStatut) => {
    try {
      await commandeService.changerStatut(commandeId, nouveauStatut);
      showAlert("success", "Statut modifié avec succès");
      fetchCommandes();

      if (showDetailModal) {
        const response = await commandeService.getById(commandeId);
        setSelectedCommande(response.data);
      }
    } catch (error) {
      showAlert("error", "Erreur lors du changement de statut");
    }
  };

  // ========== Gestion des paiements ==========

  const handleAjouterPaiement = async (e) => {
    e.preventDefault();

    if (!paiementData.amount || parseFloat(paiementData.amount) <= 0) {
      showAlert("error", "Veuillez entrer un montant valide");
      return;
    }

    try {
      await commandeService.ajouterPaiement(selectedCommande.id, paiementData);
      showAlert("success", "Paiement ajouté avec succès");
      setShowPaiementModal(false);
      resetPaiementForm();
      fetchCommandes();

      // Recharger les détails de la commande
      const response = await commandeService.getById(selectedCommande.id);
      setSelectedCommande(response.data);
    } catch (error) {
      showAlert("error", "Erreur lors de l'ajout du paiement");
    }
  };

  // ========== Gestion des articles ==========

  const addArticle = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { service_id: "", quantity: 1, description: "" },
      ],
    });
  };

  const removeArticle = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateArticle = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  // ========== Fonctions utilitaires ==========

  const resetForm = () => {
    setFormData({
      customer: "",
      due_date: "",
      notes: "",
      items: [{ service_id: "", quantity: 1, description: "" }],
    });
  };

  const resetPaiementForm = () => {
    setPaiementData({
      amount: "",
      payment_method: "CASH",
      reference: "",
      notes: "",
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const service = services.find((s) => s.id === parseInt(item.service_id));
      if (service) {
        return total + parseFloat(service.price) * parseInt(item.quantity || 1);
      }
      return total;
    }, 0);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <MainLayout>
      <div className="w-full max-w-[100vw] xl:max-w-7xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6 py-4">
        {/* En-tête */}
        <CommandesHeader
          onNewCommande={() => {
            resetForm();
            setShowModal(true);
          }}
        />

        {/* Alertes */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Filtres et recherche */}
        <CommandesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatut={filterStatut}
          setFilterStatut={setFilterStatut}
          statutChoices={STATUT_CHOICES}
        />

        {/* Résumé des statuts */}
        <CommandesStats
          commandes={commandes}
          statutChoices={STATUT_CHOICES}
          onStatutClick={setFilterStatut}
        />

        {/* Table des commandes */}
        <CommandesTable
          commandes={commandes}
          loading={loading}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />

        {/* Modal Nouvelle Commande */}
        <CommandeFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          formData={formData}
          setFormData={setFormData}
          clients={clients}
          services={services}
          onSubmit={handleSubmit}
          addArticle={addArticle}
          removeArticle={removeArticle}
          updateArticle={updateArticle}
          calculateTotal={calculateTotal}
        />

        {/* Modal Détails Commande */}
        <CommandeDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCommande(null);
          }}
          commande={selectedCommande}
          statutChoices={STATUT_CHOICES}
          modePaiementChoices={MODE_PAIEMENT_CHOICES}
          onChangerStatut={handleChangerStatut}
          onOpenPaiement={() => setShowPaiementModal(true)}
        />

        {/* Modal Ajouter Paiement */}
        <PaiementModal
          isOpen={showPaiementModal}
          onClose={() => {
            setShowPaiementModal(false);
            resetPaiementForm();
          }}
          commande={selectedCommande}
          paiementData={paiementData}
          setPaiementData={setPaiementData}
          modePaiementChoices={MODE_PAIEMENT_CHOICES}
          onSubmit={handleAjouterPaiement}
        />
      </div>
    </MainLayout>
  );
};

export default Commandes;
