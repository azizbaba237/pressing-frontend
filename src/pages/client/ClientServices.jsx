import React, { useState, useEffect } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
// import {
//   publicServiceService,
//   publicCategorieService,
// } from "../../services/clientApi";
import api from "../../services/api";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import {
  FaTag,
  FaSearch,
  FaClock,
  FaMoneyBillWave,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

const ClientServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategorie]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, categoriesRes] = await Promise.all([
        api.get("/public/services/"),
        api.get("/public/categories/"),
      ]);

      setServices(servicesRes.data.results || servicesRes.data);
      setCategories(categoriesRes.data.results || categoriesRes.data);
    } catch (error) {
      setAlert({
        type: error,
        message: "Erreur lors du chargement des services",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    if (selectedCategorie) {
      filtered = filtered.filter(
        (s) => s.category === parseInt(selectedCategorie),
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredServices(filtered);
  };

  const getCategoryColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-green-500 to-green-600",
      "from-yellow-500 to-yellow-600",
      "from-red-500 to-red-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <ClientLayout>
        <Loader text="Chargement des services..." />
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Nos Services</h1>
          <p className="text-purple-100 text-lg">
            Découvrez toutes nos prestations de pressing et nettoyage
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

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10! pr-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedCategorie}
                onChange={(e) => setSelectedCategorie(e.target.value)}
                className="input-field pl-10!"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">{filteredServices.length}</span>{" "}
            service(s) disponible(s)
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedCategorie("")}
            className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
              selectedCategorie === "" ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <div className="w-16 h-16 bg-linear-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaTag className="text-3xl text-white" />
            </div>
            <p className="text-sm font-semibold text-gray-900 text-center">
              Tous les services
            </p>
            <p className="text-2xl font-bold text-center text-gray-900 mt-2">
              {services.length}
            </p>
          </button>

          {categories.map((cat, index) => {
            const count = services.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategorie(cat.id.toString())}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategorie === cat.id.toString()
                    ? "ring-4 ring-blue-500"
                    : ""
                }`}
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${getCategoryColor(
                    index,
                  )} rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <FaTag className="text-3xl text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center">
                  {cat.name}
                </p>
                <p className="text-2xl font-bold text-center text-gray-900 mt-2">
                  {count}
                </p>
              </button>
            );
          })}
        </div>

        {/* Services List */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-5xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun service trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const category = categories.find(
                (c) => c.id === service.category,
              );
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                  {/* Category Header */}
                  <div
                    className={`h-2 bg-linear-to-r ${getCategoryColor(
                      categories.findIndex((c) => c.id === service.category),
                    )}`}
                  ></div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r ${getCategoryColor(
                          categories.findIndex(
                            (c) => c.id === service.category,
                          ),
                        )} text-white`}
                      >
                        <FaTag />
                        <span>{category?.name}</span>
                      </span>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {service.name}
                    </h3>

                    {/* Description */}
                    {service.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>
                    )}

                    {/* Service Details */}
                    <div className="space-y-3">
                      {/* Price */}
                      <div className="flex items-center justify-between bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <FaMoneyBillWave className="text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Prix</span>
                        </div>
                        <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {parseFloat(service.price).toLocaleString()} FCFA
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center justify-between bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <FaClock className="text-white" />
                          </div>
                          <span className="text-sm text-gray-600">Délai</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          {service.estimate_time}h
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="h-1 bg-linear-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Contactez-nous pour toute demande spéciale ou renseignement
          </p>

          <a
            href="/client/contact"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg"
          >
            <span>Nous contacter</span>
          </a>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientServices;
