// Mock data for RG Servicio Técnico website

export const workImages = [
  {
    id: 1,
    title: "Mantenimiento de ventilador PC",
    description: "Limpieza y mantenimiento preventivo de ventiladores",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Reparación de componentes",
    description: "Diagnóstico y reparación de hardware interno",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Mantenimiento de laptop",
    description: "Servicio completo de limpieza y optimización",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Reparación de impresoras",
    description: "Mantenimiento y reparación de impresoras",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Reparación de controles PlayStation",
    description: "Servicio especializado en controles de gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Setup gaming completo",
    description: "Configuración y optimización de equipos gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    title: "Diagnóstico de sistema",
    description: "Análisis completo de rendimiento y errores",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    title: "Mantenimiento de puertos",
    description: "Limpieza y reparación de conectores",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    title: "Instalación de componentes",
    description: "Upgrade y instalación de nuevo hardware",
    image: "https://images.unsplash.com/photo-1587202372616-b43abcc8d0df?w=400&h=300&fit=crop"
  },
  {
    id: 10,
    title: "Reparación especializada",
    description: "Servicios técnicos avanzados",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=300&fit=crop"
  }
];

export const services = [
  {
    id: 1,
    title: "Instalación Windows + Pack Office",
    description: "Tu computadora lista en menos de 24 horas. Instalación completa de Windows y Microsoft Office.",
    icon: "💻",
    features: ["Windows 11 original", "Office 365", "Drivers actualizados", "Configuración optimizada"]
  },
  {
    id: 2,
    title: "Servicio Técnico de Celulares",
    description: "Cambio de módulo, batería, pin de carga y lector de huella. Trabajamos con todas las marcas.",
    icon: "📱",
    features: ["Cambio de pantalla", "Reparación de batería", "Pin de carga", "Lector de huella"]
  },
  {
    id: 3,
    title: "Armado de PC",
    description: "Instalación de sistema operativo, programas básicos, Microsoft Office y gestión de cableado profesional.",
    icon: "🔧",
    features: ["Selección de componentes", "Ensamblado profesional", "Cable management", "Testing completo"]
  },
  {
    id: 4,
    title: "Optimización",
    description: "Mejora de rendimiento, limpieza y mantenimiento del software, corrección de fallas en Windows.",
    icon: "⚡",
    features: ["Limpieza de archivos", "Optimización de registro", "Actualización de drivers", "Mejora de velocidad"]
  },
  {
    id: 5,
    title: "Servicio de Impresoras",
    description: "Mantenimiento y reparación, cambio y reseteo de almohadillas, cambio de componentes.",
    icon: "🖨️",
    features: ["Limpieza de cabezales", "Cambio de cartuchos", "Reseteo de chips", "Calibración"]
  },
  {
    id: 6,
    title: "Mantenimiento PC",
    description: "Revisión completa, limpieza detallada de componentes, cambio de pasta térmica CPU/GPU.",
    icon: "🛠️",
    features: ["Limpieza interna", "Pasta térmica nueva", "Verificación de ventiladores", "Diagnóstico completo"]
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: "Rapidez",
    description: "Diagnósticos precisos y reparaciones eficientes. Tu equipo listo en el menor tiempo posible.",
    icon: "⚡"
  },
  {
    id: 2,
    title: "Calidad",
    description: "Componentes originales, herramientas profesionales y garantía en todos nuestros trabajos.",
    icon: "🏆"
  },
  {
    id: 3,
    title: "Trato personalizado",
    description: "Atención dedicada y asesoramiento técnico adaptado a las necesidades específicas de cada cliente.",
    icon: "👥"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Escuela Técnica N°3",
    location: "Lincoln, Buenos Aires",
    avatar: "E",
    rating: 5,
    comment: "Nos dejaron 20 PCs como nuevas. Bajó el ruido, bajó la temperatura y subió el rendimiento.",
    type: "Institución Educativa"
  },
  {
    id: 2,
    name: "PyME Metalúrgica",
    location: "Zona Oeste",
    avatar: "P",
    rating: 5,
    comment: "Respuesta clara y rápida. El plan 'Rendimiento Óptimo' nos ahorró horas de soporte.",
    type: "Empresa"
  },
  {
    id: 3,
    name: "Instituto Privado",
    location: "AMBA",
    avatar: "I",
    rating: 5,
    comment: "Detectaron fallas que no veíamos. Excelente informe y seguimiento.",
    type: "Institución"
  }
];

export const plans = [
  {
    id: 1,
    name: "Prevención Esencial",
    price: 13800,
    frequency: "Trimestral",
    icon: "💼",
    description: "Ideal para prevenir fallas y mantener equipos en buen estado",
    features: [
      "Limpieza interna y externa de PCs y notebooks",
      "Revisión física y cambio pasta térmica anual",
      "Actualizaciones de software y parches",
      "Informe de estado general de cada equipo"
    ],
    discounts: {
      "5 equipos": "5%",
      "10 equipos": "10%",
      "20+ equipos": "20%"
    },
    popular: false
  },
  {
    id: 2,
    name: "Rendimiento Óptimo",
    price: 37600,
    frequency: "Bimestral",
    icon: "⚡",
    description: "Perfecto para uso diario y máximo rendimiento",
    features: [
      "Todo lo del Plan Prevención Esencial",
      "Optimización de sistema operativo",
      "Mantenimiento preventivo de impresoras",
      "Reemplazo piezas menores sin costo",
      "Respaldo básico de información"
    ],
    discounts: {
      "5 equipos": "5%",
      "10 equipos": "10%",
      "20+ equipos": "20%"
    },
    popular: true
  },
  {
    id: 3,
    name: "Soporte Total",
    price: 95800,
    frequency: "Mensual + Asistencia Remota",
    icon: "🚀",
    description: "Para empresas que necesitan prioridad y mínima interrupción",
    features: [
      "Todo lo del Plan Rendimiento Óptimo",
      "Asistencia remota (3 intervenciones/mes)",
      "Respuesta prioritaria en menos de 24hs",
      "Monitoreo preventivo continuo"
    ],
    discounts: {
      "5 equipos": "5%",
      "10 equipos": "10%",
      "20+ equipos": "20%"
    },
    popular: false
  }
];

export const contactInfo = {
  address: "Vicente López 1029",
  city: "Lincoln, Buenos Aires, Argentina",
  email: "rgst369@gmail.com",
  phone: "2355-544386",
  whatsapp: "5492355544386",
  instagram: "@rgserviciotec",
  hours: "Solo con cita previa - Contactanos para coordinar"
};