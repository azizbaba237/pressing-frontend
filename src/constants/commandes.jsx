/**
 * Constantes pour le module Commandes
 */

export const STATUT_CHOICES = [
  { value: "PENDING", label: "En attente", color: "yellow" },
  { value: "IN_PROGRESS", label: "En cours", color: "blue" },
  { value: "READY", label: "Prêt", color: "green" },
  { value: "DELIVERED", label: "Livré", color: "purple" },
  { value: "CANCELLED", label: "Annulé", color: "red" },
];

export const MODE_PAIEMENT_CHOICES = [
  { value: "CASH", label: "Espèces" },
  { value: "CARD", label: "Carte bancaire" },
  { value: "MOBILE", label: "Mobile money" },
  { value: "CHECK", label: "Chèque" },
];

export const STATUT_COLORS = {
  yellow: "badge-warning",
  blue: "badge-info",
  green: "badge-success",
  purple: "bg-purple-100 text-purple-800",
  red: "badge-danger",
};
