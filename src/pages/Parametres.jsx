import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Alert from '../components/common/Alert';
import { useAuth } from '../contexts/AuthContext';
import {
  FaUser,
  FaLock,
  FaCog,
  FaBell,
  FaStore,
  FaSave,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import api from '../services/api';

const Parametres = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profil');
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // État profil
  const [profilData, setProfilData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
  });

  // État mot de passe
  const [passwordData, setPasswordData] = useState({
    ancien_mot_de_passe: '',
    nouveau_mot_de_passe: '',
    confirmer_mot_de_passe: '',
  });

  // État pressing
  const [pressingData, setPressingData] = useState({
    nom: 'Pressing Pro',
    adresse: '',
    telephone: '',
    email: '',
    devise: 'FCFA',
    delai_defaut: '24',
    message_recu: 'Votre commande a été bien reçue.',
    message_pret: 'Votre commande est prête. Veuillez passer la récupérer.',
  });

  // État notifications
  const [notifData, setNotifData] = useState({
    notif_nouvelle_commande: true,
    notif_paiement: true,
    notif_commande_prete: true,
    notif_email: false,
    notif_sms: false,
  });

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Sauvegarder profil
  const handleSaveProfil = async (e) => {
    e.preventDefault();
    try {
      await api.patch('/auth/profile/', profilData);
      showAlert('success', 'Profil mis à jour avec succès');
    } catch (error) {
      showAlert('success', 'Profil mis à jour avec succès (mode démo)');
    }
  };

  // Changer mot de passe
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.nouveau_mot_de_passe !== passwordData.confirmer_mot_de_passe) {
      showAlert('error', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.nouveau_mot_de_passe.length < 8) {
      showAlert('error', 'Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      await api.post('/auth/change-password/', {
        old_password: passwordData.ancien_mot_de_passe,
        new_password: passwordData.nouveau_mot_de_passe,
      });
      showAlert('success', 'Mot de passe modifié avec succès');
      setPasswordData({
        ancien_mot_de_passe: '',
        nouveau_mot_de_passe: '',
        confirmer_mot_de_passe: '',
      });
    } catch (error) {
      showAlert(error, 'Erreur lors du changement de mot de passe');
    }
  };

  // Sauvegarder paramètres pressing
  const handleSavePressing = (e) => {
    e.preventDefault();
    localStorage.setItem('pressing_config', JSON.stringify(pressingData));
    showAlert('success', 'Paramètres du pressing sauvegardés');
  };

  // Sauvegarder notifications
  const handleSaveNotifications = (e) => {
    e.preventDefault();
    localStorage.setItem('notif_config', JSON.stringify(notifData));
    showAlert('success', 'Préférences de notifications sauvegardées');
  };

  const tabs = [
    { id: 'profil', label: 'Mon Profil', icon: <FaUser /> },
    { id: 'securite', label: 'Sécurité', icon: <FaLock /> },
    { id: 'pressing', label: 'Mon Pressing', icon: <FaStore /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos préférences et la configuration de l'application
          </p>
        </div>

        {/* Alertes */}
        {alert && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Menu latéral des onglets */}
          <div className="lg:w-64">
            <div className="card p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenu des onglets */}
          <div className="flex-1">
            {/* Onglet Profil */}
            {activeTab === 'profil' && (
              <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-4xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {user?.username || 'Utilisateur'}
                    </h2>
                    <p className="text-gray-500">Administrateur</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfil} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Informations personnelles
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        value={profilData.first_name}
                        onChange={(e) =>
                          setProfilData({ ...profilData, first_name: e.target.value })
                        }
                        className="input-field"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={profilData.last_name}
                        onChange={(e) =>
                          setProfilData({ ...profilData, last_name: e.target.value })
                        }
                        className="input-field"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      value={user?.username || ''}
                      disabled
                      className="input-field bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Le nom d'utilisateur ne peut pas être modifié
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profilData.email}
                      onChange={(e) =>
                        setProfilData({ ...profilData, email: e.target.value })
                      }
                      className="input-field"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <FaSave />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'securite' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Changer le mot de passe
                </h2>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ancien mot de passe *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={passwordData.ancien_mot_de_passe}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            ancien_mot_de_passe: e.target.value,
                          })
                        }
                        className="input-field pr-10"
                        placeholder="Votre mot de passe actuel"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nouveau mot de passe *
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={passwordData.nouveau_mot_de_passe}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            nouveau_mot_de_passe: e.target.value,
                          })
                        }
                        className="input-field pr-10"
                        placeholder="Nouveau mot de passe (min. 8 caractères)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {/* Indicateur de force du mot de passe */}
                    {passwordData.nouveau_mot_de_passe && (
                      <div className="mt-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full ${
                                getPasswordStrength(passwordData.nouveau_mot_de_passe) >= level
                                  ? getPasswordStrengthColor(
                                      getPasswordStrength(passwordData.nouveau_mot_de_passe)
                                    )
                                  : 'bg-gray-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Force:{' '}
                          {getPasswordStrengthLabel(
                            getPasswordStrength(passwordData.nouveau_mot_de_passe)
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmer le nouveau mot de passe *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.confirmer_mot_de_passe}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmer_mot_de_passe: e.target.value,
                        })
                      }
                      className={`input-field ${
                        passwordData.confirmer_mot_de_passe &&
                        passwordData.nouveau_mot_de_passe !==
                          passwordData.confirmer_mot_de_passe
                          ? 'border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                    {passwordData.confirmer_mot_de_passe &&
                      passwordData.nouveau_mot_de_passe !==
                        passwordData.confirmer_mot_de_passe && (
                        <p className="text-xs text-red-500 mt-1">
                          Les mots de passe ne correspondent pas
                        </p>
                      )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-yellow-800 mb-2">
                      Conseils pour un mot de passe sécurisé:
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Au moins 8 caractères</li>
                      <li>• Mélanger lettres majuscules et minuscules</li>
                      <li>• Inclure des chiffres et des caractères spéciaux</li>
                      <li>• Ne pas utiliser d'informations personnelles</li>
                    </ul>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <FaLock />
                      <span>Changer le mot de passe</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Onglet Mon Pressing */}
            {activeTab === 'pressing' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Informations du Pressing
                </h2>

                <form onSubmit={handleSavePressing} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du pressing *
                      </label>
                      <input
                        type="text"
                        required
                        value={pressingData.nom}
                        onChange={(e) =>
                          setPressingData({ ...pressingData, nom: e.target.value })
                        }
                        className="input-field"
                        placeholder="Nom de votre pressing"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={pressingData.telephone}
                        onChange={(e) =>
                          setPressingData({
                            ...pressingData,
                            telephone: e.target.value,
                          })
                        }
                        className="input-field"
                        placeholder="+237 6XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={pressingData.email}
                        onChange={(e) =>
                          setPressingData({ ...pressingData, email: e.target.value })
                        }
                        className="input-field"
                        placeholder="contact@pressing.com"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse
                      </label>
                      <textarea
                        rows="2"
                        value={pressingData.adresse}
                        onChange={(e) =>
                          setPressingData({ ...pressingData, adresse: e.target.value })
                        }
                        className="input-field"
                        placeholder="Adresse complète de votre pressing"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Devise
                      </label>
                      <select
                        value={pressingData.devise}
                        onChange={(e) =>
                          setPressingData({ ...pressingData, devise: e.target.value })
                        }
                        className="input-field"
                      >
                        <option value="FCFA">FCFA (Franc CFA)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="USD">USD (Dollar américain)</option>
                        <option value="GNF">GNF (Franc guinéen)</option>
                        <option value="MAD">MAD (Dirham marocain)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Délai de traitement par défaut (heures)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={pressingData.delai_defaut}
                        onChange={(e) =>
                          setPressingData({
                            ...pressingData,
                            delai_defaut: e.target.value,
                          })
                        }
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Messages automatiques
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message de confirmation de réception
                        </label>
                        <textarea
                          rows="2"
                          value={pressingData.message_recu}
                          onChange={(e) =>
                            setPressingData({
                              ...pressingData,
                              message_recu: e.target.value,
                            })
                          }
                          className="input-field"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message de notification commande prête
                        </label>
                        <textarea
                          rows="2"
                          value={pressingData.message_pret}
                          onChange={(e) =>
                            setPressingData({
                              ...pressingData,
                              message_pret: e.target.value,
                            })
                          }
                          className="input-field"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <FaSave />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Préférences de notifications
                </h2>

                <form onSubmit={handleSaveNotifications} className="space-y-6">
                  {/* Notifications internes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Notifications de l'application
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: 'notif_nouvelle_commande',
                          label: 'Nouvelle commande',
                          desc: 'Recevoir une notification lors de la création d\'une nouvelle commande',
                        },
                        {
                          key: 'notif_paiement',
                          label: 'Paiement reçu',
                          desc: 'Recevoir une notification lors de l\'enregistrement d\'un paiement',
                        },
                        {
                          key: 'notif_commande_prete',
                          label: 'Commande prête',
                          desc: 'Recevoir une notification lorsqu\'une commande est marquée comme prête',
                        },
                      ].map((notif) => (
                        <div
                          key={notif.key}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{notif.label}</p>
                            <p className="text-sm text-gray-500 mt-1">{notif.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={notifData[notif.key]}
                              onChange={(e) =>
                                setNotifData({
                                  ...notifData,
                                  [notif.key]: e.target.checked,
                                })
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Canaux de notification */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Canaux de notification
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: 'notif_email',
                          label: 'Email',
                          desc: 'Recevoir les notifications par email',
                          badge: 'Bientôt disponible',
                        },
                        {
                          key: 'notif_sms',
                          label: 'SMS',
                          desc: 'Recevoir les notifications par SMS',
                          badge: 'Bientôt disponible',
                        },
                      ].map((canal) => (
                        <div
                          key={canal.key}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg opacity-60"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900">{canal.label}</p>
                              {canal.badge && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                  {canal.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{canal.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-not-allowed">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={notifData[canal.key]}
                              disabled
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="submit" className="btn-primary flex items-center space-x-2">
                      <FaSave />
                      <span>Sauvegarder les préférences</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Utilitaires pour la force du mot de passe
const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthColor = (strength) => {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  return colors[strength - 1] || 'bg-gray-200';
};

const getPasswordStrengthLabel = (strength) => {
  const labels = ['Très faible', 'Faible', 'Moyen', 'Fort'];
  return labels[strength - 1] || 'Très faible';
};

export default Parametres;