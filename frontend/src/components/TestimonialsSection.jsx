import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star, Quote } from "lucide-react";
import { apiService } from "../services/api";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await apiService.testimonials.getAll();
        setTestimonials(data);
      } catch (err) {
        setError("Error al cargar testimonios");
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando testimonios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Testimonios
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              clientes
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experiencias reales, resultados medibles
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg bg-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-12 w-12 text-blue-600" />
              </div>

              <CardContent className="p-6 relative">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star 
                      key={index} 
                      className="h-4 w-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" 
                      style={{ transitionDelay: `${index * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Comment */}
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  "{testimonial.comment}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 group-hover:scale-110 transition-transform duration-300">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.location}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs mt-1 bg-blue-100 text-blue-700 border-blue-200"
                    >
                      {testimonial.type}
                    </Badge>
                  </div>
                </div>

                {/* Animated accent line */}
                <div className="mt-4 flex justify-center">
                  <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:w-full transition-all duration-700"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Quieres ser nuestro próximo cliente satisfecho?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a cientos de clientes que confían en nuestro servicio técnico profesional
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">5.0/5 estrellas</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{testimonials.length}+</span> reseñas verificadas
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open("https://wa.me/5492355544386", "_blank")}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Solicitar Presupuesto
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector("#contacto");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="border border-gray-300 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Más Información
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;