/**
 * Utilitaires pour la validation et l'évaluation du mot de passe
 */

/**
 * Calcule la force d'un mot de passe (0-4)
 */
export const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++; // Majuscule
    if (/[0-9]/.test(password)) strength++; // Chiffre
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Caractère spécial

    return strength;
};

/**
 * Retourne la couleur correspondant à la force du mot de passe
 */
export const getPasswordStrengthColor = (strength) => {
    const colors = {
        1: 'bg-red-500',
        2: 'bg-orange-500',
        3: 'bg-yellow-500',
        4: 'bg-green-500',
    };
    return colors[strength] || 'bg-gray-200';
};

/**
 * Retourne le label correspondant à la force du mot de passe
 */
export const getPasswordStrengthLabel = (strength) => {
    const labels = {
        0: 'Très faible',
        1: 'Très faible',
        2: 'Faible',
        3: 'Moyen',
        4: 'Fort',
    };
    return labels[strength] || 'Très faible';
};

/**
 * Valide si un mot de passe respecte les critères minimaux
 */
export const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Vérifie si deux mots de passe correspondent
 */
export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};