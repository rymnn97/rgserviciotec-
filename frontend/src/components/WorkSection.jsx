import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Eye, ZoomIn } from "lucide-react";
import { apiService } from "../services/api";

const WorkSection = () => {
  const [workImages, setWorkImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkImages = async () => {
      try {
        setLoading(true);
        const data = await apiService.work.getAll();
        setWorkImages(data);
      } catch (err) {
        setError("Error al cargar los trabajos realizados");
        console.error("Error fetching work images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkImages();
  }, []);

  if (loading) {
    return (
      <section id="trabajos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando trabajos realizados...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="trabajos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="trabajos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            Trabajos Realizados
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Una muestra de nuestra{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              dedicación y calidad
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada trabajo es único y lo realizamos con la máxima atención al detalle
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {workImages.map((work, index) => (
            <Dialog key={work.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white border-0 shadow-lg">
                  <CardContent className="p-0 relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold text-sm mb-1">{work.title}</h3>
                        <p className="text-xs opacity-90">{work.description}</p>
                      </div>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-3 left-3 w-6 h-6 bg-blue-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-0 shadow-2xl">
                <div className="relative">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <h3 className="text-white text-xl font-semibold mb-2">{work.title}</h3>
                    <p className="text-white/90">{work.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Tu equipo necesita atención?
            </h3>
            <p className="text-gray-600 mb-6">
              Contáctanos para un diagnóstico gratuito y descubre cómo podemos ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open("https://wa.me/5492355544386", "_blank")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transform hover:scale-105 transition-all duration-200"
              >
                <Eye className="h-4 w-4" />
                Solicitar Diagnóstico
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const element = document.querySelector("#planes");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="border-gray-300 hover:bg-gray-900 hover:text-white px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-200"
              >
                Ver Planes de Mantenimiento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;