import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const About = () => {
  const services = [
    { name: "Lavage", desc: "Lavage soigneux de tous types de vêtements" },
    { name: "Repassage", desc: "Repassage impeccable, plis nets et durables" },
    { name: "Nettoyage à sec", desc: "Pour les tissus délicats et costumes" },
    { name: "Livraison", desc: "Suivi en temps réel via votre espace client" },
  ];

  const valeurs = [
    {
      titre: "Qualité",
      desc: "Chaque article est traité avec le plus grand soin",
    },
    {
      titre: "Rapidité",
      desc: "Vos commandes prêtes dans les meilleurs délais",
    },
    {
      titre: "Transparence",
      desc: "Suivi en temps réel de vos commandes en ligne",
    },
    {
      titre: "Confiance",
      desc: "Des centaines de clients satisfaits à Douala",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-linear-to-r from-teal-600 to-green-600 text-white py-20 px-4 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-3xl font-bold text-teal-600">PP</span>
        </div>
        <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
          Douala, Cameroun
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pressing Pro</h1>
        <p className="text-teal-100 text-lg max-w-xl mx-auto">
          Votre partenaire de confiance pour l'entretien de vos vêtements.
          Qualité, rapidité et transparence depuis Douala.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { value: "100%", label: "Satisfaction client" },
            { value: "24h", label: "Délai moyen" },
            { value: "FCFA", label: "Tarifs accessibles" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <p className="text-3xl font-bold text-teal-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nos services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-teal-600 font-bold">{s.name[0]}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Valeurs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valeurs.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 flex gap-4"
              >
                <div className="w-3 h-3 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {v.titre}
                  </h3>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nous contacter
          </h2>
          <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <FaMapMarkerAlt />, text: "Douala, Cameroun" },
              { icon: <FaPhone />, text: "+237 6XX XXX XXX" },
              { icon: <FaEnvelope />, text: "contact@pressingpro.cm" },
              { icon: <FaClock />, text: "Lun – Sam : 8h – 18h" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-600">
                <span className="text-teal-600">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
