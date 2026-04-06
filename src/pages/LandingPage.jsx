import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaClock,
  FaStar,
  FaUsers,
  FaArrowRight,
  FaTshirt,
  FaSprayCan,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaQuoteLeft,
  FaChevronUp,
} from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

const LandingPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Qualité garantie",
      description:
        "Nous prenons soin de vos vêtements comme si c'étaient les nôtres",
      gradient: "from-blue-500 to-cyan-500",
      color: "blue",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Service rapide",
      description: "Traitement express disponible en 24h",
      gradient: "from-green-500 to-emerald-500",
      color: "green",
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Satisfaction client",
      description: "Plus de 1000 clients satisfaits",
      gradient: "from-yellow-500 to-amber-500",
      color: "yellow",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Équipe professionnelle",
      description: "Personnel formé et expérimenté",
      gradient: "from-purple-500 to-pink-500",
      color: "purple",
    },
  ];

  const services = [
    {
      icon: <FaTshirt className="text-4xl" />,
      title: "Nettoyage à sec",
      description: "Pour vos vêtements délicats, un soin optimal",
      gradient: "from-blue-500 to-indigo-600",
      price: "à partir de 2000 FCFA",
    },
    {
      icon: <FaSprayCan className="text-4xl" />,
      title: "Détachage",
      description: "Élimination des taches tenaces",
      gradient: "from-green-500 to-teal-600",
      price: "à partir de 1500 FCFA",
    },
    {
      icon: <MdIron className="text-4xl" />,
      title: "Repassage",
      description: "Repassage professionnel soigné",
      gradient: "from-purple-500 to-pink-600",
      price: "à partir de 1000 FCFA",
    },
  ];

  const testimonials = [
    {
      name: "Sophie M.",
      role: "Cliente fidèle",
      content:
        "Service impeccable ! Mes vêtements sont toujours parfaitement nettoyés et repassés. Le pressing est devenu indispensable dans mon quotidien.",
      rating: 5,
      avatar: "S",
    },
    {
      name: "David K.",
      role: "Client professionnel",
      content:
        "Rapidité et qualité au rendez-vous. Je recommande vivement leurs services pour les costumes et chemises. Un vrai gain de temps !",
      rating: 5,
      avatar: "D",
    },
    {
      name: "Marie L.",
      role: "Nouvelle cliente",
      content:
        "Très satisfaite du détachage, une tache que je croyais impossible à enlever a complètement disparue. Bravo et merci !",
      rating: 5,
      avatar: "M",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Style personnalisé pour les animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(99,102,241,0.3); }
            50% { box-shadow: 0 0 20px rgba(99,102,241,0.6); }
          }
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-glow { animation: glow 2s ease-in-out infinite; }
          .gradient-bg { background: linear-gradient(-45deg, #4f46e5, #7c3aed, #ec4899, #06b6d4); background-size: 400% 400%; animation: gradientBG 15s ease infinite; }
          .card-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .card-hover:hover {
            transform: translateY(-12px);
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
          }
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>

      {/* Navbar améliorée avec effet glassmorphism */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pressing Pro
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                À propos
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Témoignages
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Contact
              </a>
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-xl transform hover:scale-105"
              >
                Connexion
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section améliorée avec dégradé animé et éléments flottants */}
      <section className="relative gradient-bg text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                <HiSparkles className="text-yellow-300" />
                <span className="text-sm font-medium">
                  Service premium à Douala
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Votre pressing de confiance
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Service professionnel de nettoyage et d'entretien de vêtements.
                Qualité, rapidité et satisfaction garanties.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl group"
                >
                  <span>Créer un compte</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all backdrop-blur-sm"
                >
                  Voir nos services
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white flex items-center justify-center text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold">+1000 clients</span> satisfaits
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-float">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FaTshirt className="text-8xl text-white/80" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">Nettoyage Express</p>
                    <p className="text-white/80">Livraison gratuite</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-white">-20%</span>
                    <span className="text-xs block text-white">
                      Première commande
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features améliorées avec animations */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Pourquoi nous choisir
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Des atouts qui font la différence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les avantages qui font de notre pressing le choix
              préféré des Doualais
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg p-8 card-hover overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                ></div>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services améliorés */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Nos prestations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Services sur mesure
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une gamme complète de prestations pour répondre à tous vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden card-hover border border-gray-100"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${service.gradient}`}
                ></div>
                <div className="p-8 text-center">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-indigo-600 font-bold mb-6">
                    {service.price}
                  </p>
                  <Link
                    to="/client/services"
                    className="inline-flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group-hover:space-x-3"
                  >
                    <span>En savoir plus</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle section témoignages */}
      <section
        id="testimonials"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Ce que nos clients disent
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 card-hover border border-gray-100"
              >
                <FaQuoteLeft className="text-indigo-200 text-3xl mb-4" />
                <p className="text-gray-700 mb-6 italic">
                  {testimonial.content}
                </p>
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex text-yellow-400 text-sm mt-1">
                      {"★".repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle section CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à nous confier vos vêtements ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez nos milliers de clients satisfaits et bénéficiez de nos
            services d'exception
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            <span>Commencer maintenant</span>
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer amélioré */}
      <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Pressing Pro
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Votre pressing de confiance à Douala. Service professionnel de
                nettoyage et d'entretien de vêtements.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors hover:scale-110 transform"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transform transition-transform"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors hover:scale-110 transform"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/client/services"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Nos services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/client/login"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/client/register"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Créer un compte
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Espace Admin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Nos services</h3>
              <ul className="space-y-3 text-gray-400">
                <li>Nettoyage à sec</li>
                <li>Détachage professionnel</li>
                <li>Repassage soigné</li>
                <li>Livraison à domicile</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-indigo-400" />
                  <span>Douala, Cameroun</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-indigo-400" />
                  <span>+237 6XX XXX XXX</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="text-indigo-400" />
                  <span>contact@pressing.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaClock className="text-indigo-400" />
                  <span>Lun-Ven : 8h-18h</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © 2026 Pressing Pro. Tous droits réservés. | Design élégant et
              service premium
            </p>
          </div>
        </div>
      </footer>

      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform z-50 animate-glow"
        >
          <FaChevronUp />
        </button>
      )}
    </div>
  );
};

export default LandingPage;
