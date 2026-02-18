import React from "react";
import { ORDER_STATUS } from "../../constants/reports";

const StatusBadge = ({ status }) => {
  const statusInfo = ORDER_STATUS[status] || {
    label: status,
    color: "info",
  };

  const colorClasses = {
    warning: "badge-warning",
    info: "badge-info",
    success: "badge-success",
    purple: "bg-purple-100 text-purple-800",
    danger: "badge-danger",
  };

  const className = colorClasses[statusInfo.color] || "badge-info";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {statusInfo.label}
    </span>
  );
};

export default StatusBadge;
