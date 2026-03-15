import React, { useState } from 'react';
import ClientLayout from '../../components/layout/ClientLayout';
import { contactService } from '../../services/clientApi';
import Alert from '../../components/common/Alert';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaPaperPlane,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
} from 'react-icons/fa';

const ClientContact = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nom || !formData.message) {
            setAlert({
                type: 'error',
                message: 'Veuillez remplir tous les champs obligatoires',
            });
            return;
        }

        setLoading(true);

        try {
            await contactService.sendMessage(formData);

            setAlert({
                type: 'success',
                message:
                    'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
            });

            setFormData({
                nom: '',
                email: '',
                telephone: '',
                sujet: '',
                message: '',
            });
        } catch (error) {
            setAlert({
                type: error,
                message: "Erreur lors de l'envoi du message. Veuillez réessayer.",
            });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <FaPhone />,
            title: 'Téléphone',
            info: '+237 6XX XXX XXX',
            color: 'from-blue-500 to-blue-600',
            action: 'tel:+237600000000',
        },
        {
            icon: <FaWhatsapp />,
            title: 'WhatsApp',
            info: '+237 6XX XXX XXX',
            color: 'from-green-500 to-green-600',
            action: 'https://wa.me/237600000000',
        },
        {
            icon: <FaEnvelope />,
            title: 'Email',
            info: 'contact@pressing.com',
            color: 'from-purple-500 to-purple-600',
            action: 'mailto:contact@pressing.com',
        },
        {
            icon: <FaMapMarkerAlt />,
            title: 'Adresse',
            info: 'Douala, Cameroun',
            color: 'from-pink-500 to-pink-600',
            action: null,
        },
    ];

    const socialMedia = [
        {
            icon: <FaFacebook />,
            name: 'Facebook',
            color: 'from-blue-600 to-blue-700',
            link: '#',
        },
        {
            icon: <FaInstagram />,
            name: 'Instagram',
            color: 'from-pink-600 to-purple-600',
            link: '#',
        },
        {
            icon: <FaWhatsapp />,
            name: 'WhatsApp',
            color: 'from-green-600 to-green-700',
            link: '#',
        },
    ];

    return (
        <ClientLayout>
            <div className="space-y-8">

                {/* Header */}
                <div className="bg-linear-to-r from-green-600 via-teal-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Contactez-nous</h1>
                    <p className="text-green-100 text-lg">
                        Nous sommes là pour répondre à toutes vos questions
                    </p>
                </div>

                {/* Alerts */}
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Contact Cards */}
                        {contactInfo.map((item, index) => (
                            <a
                                key={index}
                                href={item.action || '#'}
                                className={`block bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${!item.action ? 'cursor-default' : ''
                                    }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div
                                        className={`w-14 h-14 bg-linear-to-br ${item.color} rounded-full flex items-center justify-center shrink-0`}
                                    >
                                        <span className="text-2xl text-white">{item.icon}</span>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{item.info}</p>
                                    </div>
                                </div>
                            </a>
                        ))}

                        {/* Hours */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-14 h-14 bg-linear-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shrink-0">
                                    <FaClock className="text-2xl text-white" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-3">Horaires</h3>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Lun - Ven:</span>
                                            <span className="font-semibold text-gray-900">
                                                8h - 18h
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Samedi:</span>
                                            <span className="font-semibold text-gray-900">
                                                9h - 15h
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Dimanche:</span>
                                            <span className="font-semibold text-red-600">Fermé</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Suivez-nous</h3>

                            <div className="flex space-x-3">
                                {socialMedia.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 bg-linear-to-br ${social.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform`}
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-xl p-8">

                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Envoyez-nous un message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom complet *
                                        </label>

                                        <input
                                            type="text"
                                            name="nom"
                                            required
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="Votre nom"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone *
                                        </label>

                                        <input
                                            type="tel"
                                            name="telephone"
                                            required
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="+237 6XX XXX XXX"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="votre@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sujet
                                    </label>

                                    <select
                                        name="sujet"
                                        value={formData.sujet}
                                        onChange={handleChange}
                                        className="input-field"
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="information">Demande d'information</option>
                                        <option value="reclamation">Réclamation</option>
                                        <option value="suggestion">Suggestion</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>

                                    <textarea
                                        name="message"
                                        required
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Écrivez votre message ici..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Envoi en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            <span>Envoyer le message</span>
                                        </>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="h-96 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <FaMapMarkerAlt className="text-6xl mx-auto mb-4" />
                            <p className="text-lg font-semibold">Carte interactive</p>
                            <p className="text-sm">Intégration Google Maps à venir</p>
                        </div>
                    </div>
                </div>

            </div>
        </ClientLayout>
    );
};

export default ClientContact;