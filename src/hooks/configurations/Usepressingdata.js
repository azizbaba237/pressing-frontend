import { useState, useEffect } from 'react';
import { DEFAULT_MESSAGES } from '../../constants/configurations';

/**
 * Hook pour gérer les paramètres du pressing
 */
export const usePressingData = ({ showAlert }) => {
    const [pressingData, setPressingData] = useState({
        nom: 'Pressing Pro',
        adresse: '',
        telephone: '',
        email: '',
        devise: 'FCFA',
        delai_defaut: '24',
        ...DEFAULT_MESSAGES,
    });

    // Charger les données depuis localStorage au montage
    useEffect(() => {
        const savedConfig = localStorage.getItem('pressing_config');
        if (savedConfig) {
            try {
                setPressingData(JSON.parse(savedConfig));
            } catch (error) {
                console.error('Erreur chargement config:', error);
            }
        }
    }, []);

    const handleSavePressing = (e) => {
        e.preventDefault();

        try {
            localStorage.setItem('pressing_config', JSON.stringify(pressingData));
            showAlert('success', 'Paramètres du pressing sauvegardés');
        } catch (error) {
            console.error('Erreur sauvegarde pressing:', error);
            showAlert('error', 'Erreur lors de la sauvegarde');
        }
    };

    const handleChange = (field, value) => {
        setPressingData(prev => ({ ...prev, [field]: value }));
    };

    return {
        pressingData,
        handleChange,
        handleSavePressing,
    };
};

export default usePressingData;