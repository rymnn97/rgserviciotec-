import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { apiService } from "../services/api";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await apiService.services.getAll();
        setServices(data);
      } catch (err) {
        setError("Error al cargar los servicios");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando servicios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Servicios
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones completas para todos tus equipos tecnológicos
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg bg-white overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  {service.price_from && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      Desde ${service.price_from.toLocaleString()}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
                {service.duration && (
                  <Badge variant="outline" className="text-xs mt-2 w-fit">
                    ⏱️ {service.duration}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="relative">
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group/item">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-sm text-gray-600 group-hover/item:text-gray-900 transition-colors duration-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300 justify-between p-4 h-auto"
                  onClick={() => window.open("https://wa.me/5492355544386", "_blank")}
                >
                  <span className="font-medium">Más información</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿No encuentras lo que necesitas?
            </h3>
            <p className="text-gray-600 mb-6">
              Ofrecemos servicios personalizados para cualquier tipo de equipo o problema técnico
            </p>
            <Button 
              onClick={() => window.open("https://wa.me/5492355544386", "_blank")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              Consulta Personalizada
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;