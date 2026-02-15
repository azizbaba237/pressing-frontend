import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getPaymentModeInfo } from "../constants/paymentModes";

/**
 * Configuration des colonnes de la table des paiements
 */
export const getPaymentColumns = () => [
  {
    header: "Date",
    accessor: "payment_date",
    render: (row) => (
      <div>
        <p className="font-semibold">
          {format(new Date(row.payment_date), "dd/MM/yyyy", { locale: fr })}
        </p>
        <p className="text-sm text-gray-500">
          {format(new Date(row.payment_date), "HH:mm", { locale: fr })}
        </p>
      </div>
    ),
  },
  {
    header: "N° Commande",
    accessor: "order_id",
    render: (row) => (
      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
        {row.order_id || "-"}
      </span>
    ),
  },
  {
    header: "Montant",
    accessor: "amount",
    render: (row) => (
      <span className="font-semibold text-green-600 text-lg">
        {parseFloat(row.amount).toLocaleString()} FCFA
      </span>
    ),
  },
  {
    header: "Mode de paiement",
    accessor: "payment_method",
    render: (row) => {
      const mode = getPaymentModeInfo(row.payment_method);
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          <span>{mode?.icon}</span>
          <span>{mode?.label}</span>
        </span>
      );
    },
  },
  {
    header: "Référence",
    accessor: "reference",
    render: (row) => row.reference || "-",
  },
  {
    header: "Utilisateur",
    accessor: "user_name",
    render: (row) => row.user_name || "-",
  },
  {
    header: "Notes",
    accessor: "notes",
    render: (row) =>
      row.notes ? (
        <span className="text-sm text-gray-600 italic">{row.notes}</span>
      ) : (
        "-"
      ),
  },
];
