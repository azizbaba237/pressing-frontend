/**
 * Constantes des modes de paiement
 */
export const MODE_PAIEMENT_CHOICES = [
    { value: "CASH", label: "Espèces", icon: "💵" },
    { value: "CARD", label: "Carte bancaire", icon: "💳" },
    { value: "MOBILE_MONEY", label: "Mobile money", icon: "📱" },
    { value: "CHECK", label: "Chèque", icon: "📝" },
];

/**
 * Récupère les informations d'un mode de paiement
 */
export const getPaymentModeInfo = (value) => {
    return MODE_PAIEMENT_CHOICES.find((m) => m.value === value);
};

/**
 * Récupère la clé stats pour un mode de paiement
 */
export const getStatsKey = (paymentMethod) => {
    return paymentMethod.toLowerCase();
};