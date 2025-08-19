import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageCircle, Instagram, Eye, Check } from "lucide-react";

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5492355544386", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://instagram.com/rgserviciotec", "_blank");
  };

  const scrollToPlans = () => {
    const element = document.querySelector("#planes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-50/10 to-cyan-50/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <Badge 
              variant="secondary" 
              className="text-sm px-4 py-2 bg-blue-100/80 text-blue-700 border-blue-200 hover:bg-blue-200/80 transition-colors duration-300"
            >
              Servicio Técnico Profesional
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
            Hablemos de lo que necesita{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              tu equipo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Especialistas en reparación de PC, notebooks, consolas y celulares. 
            Servicio técnico profesional con garantía y trato personalizado.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up animation-delay-400">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Escríbenos por WhatsApp
            </Button>
            
            <Button
              onClick={handleInstagram}
              size="lg"
              variant="outline"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:from-pink-600 hover:to-purple-600"
            >
              <Instagram className="h-5 w-5" />
              Escríbenos por Instagram
            </Button>
            
            <Button
              onClick={scrollToPlans}
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Eye className="h-5 w-5" />
              Ver Planes
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-600 animate-slide-up animation-delay-600">
            <div className="flex items-center gap-2 group">
              <Check className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Garantía incluida</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 group">
              <Check className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Trato personalizado</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2 group">
              <Check className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Todas las marcas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;