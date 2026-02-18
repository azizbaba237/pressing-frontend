import { format, subDays, eachDayOfInterval } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formate un montant en FCFA
 */
export const formatMontant = (amount) => {
  return `${parseFloat(amount || 0).toLocaleString()} FCFA`;
};

/**
 * Formate une date
 */
export const formatDate = (date, formatStr = "dd/MM/yyyy") => {
  if (!date) return "-";
  return format(new Date(date), formatStr, { locale: fr });
};

/**
 * Calcule un pourcentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

/**
 * Génère un intervalle de dates
 */
export const generateDateInterval = (days) => {
  const daysNum = parseInt(days);
  const dateDebut = subDays(new Date(), daysNum);
  return eachDayOfInterval({ start: dateDebut, end: new Date() });
};

/**
 * Formate une date pour les graphiques
 */
export const formatChartDate = (date) => {
  return format(date, "dd/MM", { locale: fr });
};

/**
 * Parse un montant en nombre décimal
 */
export const parseMontant = (amount) => {
  return parseFloat(amount || 0);
};

/**
 * Groupe des données par date
 */
export const groupByDate = (items, dateField) => {
  return items.reduce((acc, item) => {
    const dateStr = format(new Date(item[dateField]), "yyyy-MM-dd");
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(item);
    return acc;
  }, {});
};

/**
 * Calcule la somme d'un champ dans un tableau
 */
export const sumField = (items, field) => {
  return items.reduce((sum, item) => sum + parseMontant(item[field]), 0);
};