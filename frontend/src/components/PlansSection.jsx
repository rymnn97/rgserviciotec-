import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Check, Crown, Zap, TrendingUp } from "lucide-react";
import { plans } from "../data/mockData";

const PlansSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountedPrice = (price) => {
    return isYearly ? price * 10 : price; // 10 months when paying yearly
  };

  return (
    <section id="planes" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Planes
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Planes de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Suscripción
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Mantené tus equipos siempre en perfecto estado
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 bg-white rounded-full p-2 max-w-xs mx-auto shadow-lg">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              Mensual
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
              Anual
            </span>
            {isYearly && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                2 meses gratis
              </Badge>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-500 transform hover:scale-105 ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 to-white' 
                  : 'hover:shadow-xl bg-white shadow-lg'
              } border-0`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-1 text-sm font-semibold">
                    <Crown className="h-3 w-3 mr-1" />
                    Recomendado
                  </Badge>
                </div>
              )}

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-full"></div>

              <CardHeader className="text-center relative pt-8">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(getDiscountedPrice(plan.price))}
                  </span>
                  <span className="text-gray-600 text-sm">/mes por equipo</span>
                </div>
                {isYearly && (
                  <div className="text-sm text-green-600 font-medium">
                    Ahorrás {formatPrice(plan.price * 2)} al año
                  </div>
                )}
                <div className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full inline-block">
                  Frecuencia: {plan.frequency}
                </div>
                <CardDescription className="text-gray-600 mt-3">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group/item">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Discounts */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    Descuentos por volumen
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(plan.discounts).map(([volume, discount]) => (
                      <div key={volume} className="flex justify-between text-xs text-gray-600">
                        <span>{volume}:</span>
                        <span className="font-medium text-green-600">{discount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full py-6 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg'
                      : 'bg-gray-900 hover:bg-blue-600 text-white'
                  }`}
                  onClick={() => window.open("https://wa.me/5492355544386", "_blank")}
                >
                  {plan.popular && <Zap className="h-4 w-4 mr-2" />}
                  Seleccionar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ¿Necesitas un plan personalizado?
              </h3>
              <p className="text-gray-600 mb-4">
                Para empresas con más de 20 equipos o necesidades específicas, 
                creamos planes a medida que se adapten perfectamente a tu negocio.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open("https://wa.me/5492355544386", "_blank")}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Consultar Plan Personalizado
              </Button>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Garantía de satisfacción
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>30 días de garantía en todos los trabajos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cancelación sin penalidades</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Soporte técnico incluido</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Informes detallados de cada servicio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;