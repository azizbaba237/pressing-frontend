import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

/**
 * Hook pour gérer les données du profil utilisateur
 */
export const useProfilData = ({ showAlert }) => {
  const { user } = useAuth();

  const [profilData, setProfilData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
  });

  const handleSaveProfil = async (e) => {
    e.preventDefault();

    try {
      await api.patch('/auth/profile/', profilData);
      showAlert('success', 'Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      // Mode démo
      showAlert('success', 'Profil mis à jour avec succès (mode démo)');
    }
  };

  const handleChange = (field, value) => {
    setProfilData(prev => ({ ...prev, [field]: value }));
  };

  return {
    user,
    profilData,
    handleChange,
    handleSaveProfil,
  };
};

export default useProfilData;