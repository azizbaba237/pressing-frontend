/**
 * Utilitaires pour le module Clients
 */

/**
 * Formate un montant en FCFA
 */
export const formatCurrency = (amount) => {
    const value = parseFloat(amount) || 0;
    return `${value.toLocaleString()} FCFA`;
};

/**
 * Valide un numéro de téléphone
 */
export const validatePhone = (phone) => {
    // Accepte les formats: +237 6XX XXX XXX ou 6XX XXX XXX
    const cleaned = phone.replace(/\s/g, "");
    const phoneRegex = /^(\+237)?[6][0-9]{8}$/;
    return phoneRegex.test(cleaned);
};

/**
 * Valide un email
 */
export const validateEmail = (email) => {
    if (!email) return true; // Email optionnel
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valide les données du formulaire client
 */
export const validateClientForm = (formData) => {
    const errors = [];

    if (!formData.first_name?.trim()) {
        errors.push("Le prénom est requis");
    }

    if (!formData.last_name?.trim()) {
        errors.push("Le nom est requis");
    }

    if (!formData.phone?.trim()) {
        errors.push("Le téléphone est requis");
    } else if (!validatePhone(formData.phone)) {
        errors.push("Le numéro de téléphone est invalide");
    }

    if (formData.email && !validateEmail(formData.email)) {
        errors.push("L'email est invalide");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Formate le nom complet d'un client
 */
export const getFullName = (client) => {
    if (!client) return "";
    return `${client.last_name} ${client.first_name}`.trim();
};

/**
 * Nettoie les données du formulaire avant envoi
 */
export const sanitizeFormData = (formData) => {
    return {
        ...formData,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || "",
        adresse: formData.adresse?.trim() || "",
    };
};

