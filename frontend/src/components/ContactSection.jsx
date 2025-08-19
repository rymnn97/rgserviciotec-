import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "../hooks/use-toast";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Instagram, 
  MessageCircle,
  Send,
  CheckCircle 
} from "lucide-react";
import { contactInfo } from "../data/mockData";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppSubmit = async () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y mensaje",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      const whatsappMessage = `Hola, soy ${formData.name}. ${formData.message}`;
      const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "¡Mensaje preparado!",
        description: "Te redirigimos a WhatsApp para enviar tu consulta",
        variant: "default"
      });
      
      // Reset form
      setFormData({ name: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Contacto
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Consultanos sin{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              compromiso
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte con cualquier consulta sobre nuestros servicios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 mb-4">
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      {contactInfo.address}<br />
                      {contactInfo.city}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horarios</h3>
                    <p className="text-gray-600">{contactInfo.hours}</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-200">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                    <p className="text-gray-600">{contactInfo.instagram}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, "_blank")}
                className="bg-green-500 hover:bg-green-600 text-white p-6 h-auto rounded-xl flex flex-col items-center gap-2 transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="font-semibold">WhatsApp</span>
                <span className="text-xs opacity-90">Respuesta inmediata</span>
              </Button>
              
              <Button
                onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
                variant="outline"
                className="border-pink-300 hover:bg-pink-50 text-pink-600 p-6 h-auto rounded-xl flex flex-col items-center gap-2 transform hover:scale-105 transition-all duration-300"
              >
                <Instagram className="h-6 w-6" />
                <span className="font-semibold">Instagram</span>
                <span className="text-xs opacity-90">Síguenos</span>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Enviar Consulta
              </CardTitle>
              <CardDescription className="text-gray-600">
                Completa el formulario y te contactaremos a la brevedad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe tu consulta o problema técnico..."
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  required
                />
              </div>

              <Button
                onClick={handleWhatsAppSubmit}
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold text-base transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Preparando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar por WhatsApp
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Al enviar, serás redirigido a WhatsApp para completar tu consulta
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Listo para mejorar el rendimiento de tu equipo?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Optimizamos, reparamos y damos soporte técnico para que todo funcione como debe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, "_blank")}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar por WhatsApp
              </Button>
              
              <Button
                onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:from-pink-600 hover:to-purple-600"
              >
                <Instagram className="h-5 w-5" />
                Contactar por Instagram
              </Button>
              
              <Button
                onClick={() => {
                  const element = document.querySelector("#planes");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Ver Planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;