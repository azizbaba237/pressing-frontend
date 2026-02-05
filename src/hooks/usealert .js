import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return {
    alert,
    showAlert,
    closeAlert,
  };
};
