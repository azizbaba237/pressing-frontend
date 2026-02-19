import { useState } from 'react';
import api from '../../services/api';
import { validatePassword, passwordsMatch } from '../../utils/configurations/Passwordutils';

/**
 * Hook pour gérer le changement de mot de passe
 */
export const usePasswordData = ({ showAlert }) => {
    const [passwordData, setPasswordData] = useState({
        ancien_mot_de_passe: '',
        nouveau_mot_de_passe: '',
        confirmer_mot_de_passe: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Validation
        if (!passwordsMatch(passwordData.nouveau_mot_de_passe, passwordData.confirmer_mot_de_passe)) {
            showAlert('error', 'Les mots de passe ne correspondent pas');
            return;
        }

        const validation = validatePassword(passwordData.nouveau_mot_de_passe);
        if (!validation.isValid) {
            showAlert('error', validation.errors[0]);
            return;
        }

        try {
            await api.post('/auth/change-password/', {
                old_password: passwordData.ancien_mot_de_passe,
                new_password: passwordData.nouveau_mot_de_passe,
            });

            showAlert('success', 'Mot de passe modifié avec succès');

            // Réinitialiser le formulaire
            setPasswordData({
                ancien_mot_de_passe: '',
                nouveau_mot_de_passe: '',
                confirmer_mot_de_passe: '',
            });
        } catch (error) {
            console.error('Erreur changement mot de passe:', error);
            showAlert('error', 'Erreur lors du changement de mot de passe');
        }
    };

    const handleChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    return {
        passwordData,
        showPassword,
        showNewPassword,
        setShowPassword,
        setShowNewPassword,
        handleChange,
        handleChangePassword,
    };
};

export default usePasswordData;