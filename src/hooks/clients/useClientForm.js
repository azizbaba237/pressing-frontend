import { useState } from "react";
import { clientService } from "../../services/api";
import {
    DEFAULT_FORM_DATA,
    SUCCESS_MESSAGES,
    ERROR_MESSAGES
} from "../../constants/clients";
import { validateClientForm, sanitizeFormData } from "../../utils/clients";

/**
 * Hook pour gérer le formulaire client
 */
export const useClientForm = ({
    showAlert,
    fetchClients,
    setShowModal,
    setSelectedClient,
}) => {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e, selectedClient) => {
        e.preventDefault();

        // Validation
        const validation = validateClientForm(formData);
        console.log("Validation result:", validation);
        if (!validation.isValid) {
            showAlert("error", validation.errors[0]);
            // ✅ Throw pour que ClientFormModal affiche les erreurs inline
            throw { field: "validation", message: validation.errors[0], errors: validation.errors };
        }

        setIsSubmitting(true);

        try {
            const cleanData = sanitizeFormData(formData);

            if (selectedClient) {
                await clientService.update(selectedClient.id, cleanData);
                showAlert("success", SUCCESS_MESSAGES.updated);
            } else {
                await clientService.create(cleanData);
                showAlert("success", SUCCESS_MESSAGES.created);
            }

            setShowModal(false);
            resetForm();
            fetchClients();
        } catch (error) {
            console.error("Erreur handleSubmit:", error);

            // Récupérer l'erreur téléphone spécifiquement
            const phoneError = error.response?.data?.phone?.[0];
            const errorMessage =
                phoneError ||
                error.response?.data?.message ||
                ERROR_MESSAGES.save;

            showAlert("error", errorMessage);

            // ✅ Propager pour que ClientFormModal puisse afficher l'erreur inline
            if (phoneError) {
                throw { field: "phone", message: phoneError };
            }
        }
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setFormData({
            last_name: client.last_name,
            first_name: client.first_name,
            phone: client.phone,
            email: client.email || "",
            adresse: client.adresse || "",
            actif: client.actif,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setSelectedClient(null);
        setFormData(DEFAULT_FORM_DATA);
    };

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleEdit,
        resetForm,
    };
};

export default useClientForm;