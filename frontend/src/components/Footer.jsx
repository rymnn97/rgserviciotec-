import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  MessageCircle,
  ArrowUp,
  Heart,
  Shield,
  Clock,
  Award
} from "lucide-react";
import { contactInfo } from "../data/mockData";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const services = [
    "Instalación Windows + Office",
    "Servicio Técnico Celulares",
    "Armado de PC",
    "Optimización de Sistemas",
    "Servicio de Impresoras",
    "Mantenimiento PC"
  ];

  const quickLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Planes", href: "#planes" },
    { name: "Testimonios", href: "#testimonios" },
    { name: "Contacto", href: "#contacto" }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">RG</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">RG Servicio Técnico</h3>
                  <p className="text-gray-400 text-sm">Especialistas en tecnología</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Brindamos servicios técnicos profesionales para PC, notebooks, consolas y celulares. 
                Con más de 500 equipos reparados y 98% de satisfacción del cliente.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="bg-green-100/20 text-green-400 border-green-400/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Garantía Incluida
                </Badge>
                <Badge variant="secondary" className="bg-blue-100/20 text-blue-400 border-blue-400/30">
                  <Clock className="h-3 w-3 mr-1" />
                  Servicio 24h
                </Badge>
                <Badge variant="secondary" className="bg-purple-100/20 text-purple-400 border-purple-400/30">
                  <Award className="h-3 w-3 mr-1" />
                  5★ Calificación
                </Badge>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, "_blank")}
                  className="hover:bg-green-500/20 text-green-400 hover:text-green-300 rounded-full border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-110"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
                  className="hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 rounded-full border border-pink-500/30 hover:border-pink-400 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => window.open(`mailto:${contactInfo.email}`, "_blank")}
                  className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-full border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Servicios</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => {
                        const element = document.querySelector("#servicios");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left block group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        {service}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="h-4 w-4 text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-200" />
                  <div className="text-gray-300">
                    <div>{contactInfo.address}</div>
                    <div className="text-sm text-gray-400">{contactInfo.city}</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform duration-200" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <Instagram className="h-4 w-4 text-pink-400 group-hover:scale-110 transition-transform duration-200" />
                  <a 
                    href="https://instagram.com/rgserviciotec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    {contactInfo.instagram}
                  </a>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-2">Horarios de Atención:</p>
                <p className="text-gray-300 text-sm">{contactInfo.hours}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-blue-500/10"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© {currentYear} RG Servicio Técnico. Hecho con</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>en Lincoln, Buenos Aires</span>
              </div>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={scrollToTop}
                className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-full border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-110"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;