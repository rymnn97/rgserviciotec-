import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { whyChooseUs } from "../data/mockData";

const WhyUsSection = () => {
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Por qué elegirnos
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Tres pilares que nos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              distinguen
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestra experiencia y dedicación nos convierten en la mejor opción para el cuidado de tus equipos
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {whyChooseUs.map((feature, index) => (
            <Card 
              key={feature.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg bg-white relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="text-center pt-8 relative">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center pb-8 relative">
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </CardDescription>
                
                {/* Animated accent line */}
                <div className="mt-6 flex justify-center">
                  <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
                </div>
              </CardContent>

              {/* Animated corner accent */}
              <div className="absolute bottom-0 left-0 w-0 h-0 bg-blue-500 transition-all duration-500 group-hover:w-3 group-hover:h-3"></div>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-600 font-medium">Equipos Reparados</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-gray-600 font-medium">Satisfacción</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                24h
              </div>
              <div className="text-gray-600 font-medium">Tiempo Promedio</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                5★
              </div>
              <div className="text-gray-600 font-medium">Calificación</div>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Nuestros Valores
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Honestidad", "Profesionalismo", "Compromiso", "Innovación", "Confianza"].map((value) => (
              <Badge 
                key={value} 
                variant="secondary" 
                className="text-sm px-4 py-2 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors duration-300 hover:scale-105 transform"
              >
                {value}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;