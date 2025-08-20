"""
Seed data for RG Servicio Técnico database
"""
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import asyncio
from models import Service, Plan, Testimonial, WorkImage, CompanyInfo

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Real data from the website
SERVICES_DATA = [
    {
        "title": "Instalación Windows + Pack Office",
        "description": "Tu computadora lista en menos de 24 horas. Instalación completa de Windows y Microsoft Office.",
        "icon": "💻",
        "features": [
            "Windows 11 original",
            "Microsoft Office completo", 
            "Drivers actualizados",
            "Configuración optimizada",
            "Programas básicos incluidos",
            "Garantía de instalación"
        ],
        "price_from": 15000,
        "duration": "24 horas"
    },
    {
        "title": "Servicio Técnico de Celulares",
        "description": "Cambio de módulo, batería, pin de carga y lector de huella. Trabajamos con todas las marcas.",
        "icon": "📱",
        "features": [
            "Cambio de pantalla",
            "Reparación de batería",
            "Pin de carga",
            "Lector de huella",
            "Todas las marcas",
            "Repuestos originales"
        ],
        "price_from": 8000,
        "duration": "2-3 días"
    },
    {
        "title": "Armado de PC",
        "description": "Instalación de sistema operativo, programas básicos, Microsoft Office y gestión de cableado profesional.",
        "icon": "🔧",
        "features": [
            "Selección de componentes",
            "Ensamblado profesional",
            "Cable management",
            "Testing completo",
            "Sistema operativo",
            "Configuración inicial"
        ],
        "price_from": 25000,
        "duration": "1-2 días"
    },
    {
        "title": "Optimización",
        "description": "Mejora de rendimiento, limpieza y mantenimiento del software, corrección de fallas en Windows.",
        "icon": "⚡",
        "features": [
            "Limpieza de archivos",
            "Optimización de registro",
            "Actualización de drivers",
            "Mejora de velocidad",
            "Eliminación de virus",
            "Configuración de arranque"
        ],
        "price_from": 5000,
        "duration": "2-4 horas"
    },
    {
        "title": "Servicio de Impresoras",
        "description": "Mantenimiento y reparación, cambio y reseteo de almohadillas, cambio de componentes.",
        "icon": "🖨️",
        "features": [
            "Limpieza de cabezales",
            "Cambio de cartuchos",
            "Reseteo de chips",
            "Calibración",
            "Cambio de almohadillas",
            "Reparación de componentes"
        ],
        "price_from": 4000,
        "duration": "1-2 días"
    },
    {
        "title": "Mantenimiento PC",
        "description": "Revisión completa, limpieza detallada de componentes, cambio de pasta térmica CPU/GPU.",
        "icon": "🛠️",
        "features": [
            "Limpieza interna completa",
            "Pasta térmica nueva",
            "Verificación de ventiladores",
            "Diagnóstico completo",
            "Revisión de conexiones",
            "Optimización de temperatura"
        ],
        "price_from": 6000,
        "duration": "3-5 horas"
    }
]

PLANS_DATA = [
    {
        "name": "Prevención Esencial",
        "price": 13800,
        "frequency": "Trimestral",
        "icon": "💼",
        "description": "Ideal para prevenir fallas y mantener equipos en buen estado",
        "features": [
            "Limpieza interna y externa de PCs y notebooks",
            "Revisión física y cambio pasta térmica anual",
            "Actualizaciones de software y parches",
            "Informe de estado general de cada equipo"
        ],
        "discounts": {
            "5 equipos": "5%",
            "10 equipos": "10%",
            "20+ equipos": "20%"
        },
        "popular": False
    },
    {
        "name": "Rendimiento Óptimo",
        "price": 37600,
        "frequency": "Bimestral",
        "icon": "⚡",
        "description": "Perfecto para uso diario y máximo rendimiento",
        "features": [
            "Todo lo del Plan Prevención Esencial",
            "Optimización de sistema operativo",
            "Mantenimiento preventivo de impresoras",
            "Reemplazo piezas menores sin costo",
            "Respaldo básico de información"
        ],
        "discounts": {
            "5 equipos": "5%",
            "10 equipos": "10%",
            "20+ equipos": "20%"
        },
        "popular": True
    },
    {
        "name": "Soporte Total",
        "price": 95800,
        "frequency": "Mensual + Asistencia Remota",
        "icon": "🚀",
        "description": "Para empresas que necesitan prioridad y mínima interrupción",
        "features": [
            "Todo lo del Plan Rendimiento Óptimo",
            "Asistencia remota (3 intervenciones/mes)",
            "Respuesta prioritaria en menos de 24hs",
            "Monitoreo preventivo continuo"
        ],
        "discounts": {
            "5 equipos": "5%",
            "10 equipos": "10%",
            "20+ equipos": "20%"
        },
        "popular": False
    }
]

TESTIMONIALS_DATA = [
    {
        "name": "Escuela Técnica N°3",
        "location": "Lincoln, Buenos Aires",
        "avatar": "E",
        "rating": 5,
        "comment": "Nos dejaron 20 PCs como nuevas. Bajó el ruido, bajó la temperatura y subió el rendimiento.",
        "type": "Institución Educativa",
        "approved": True
    },
    {
        "name": "PyME Metalúrgica",
        "location": "Zona Oeste",
        "avatar": "P",
        "rating": 5,
        "comment": "Respuesta clara y rápida. El plan 'Rendimiento Óptimo' nos ahorró horas de soporte.",
        "type": "Empresa",
        "approved": True
    },
    {
        "name": "Instituto Privado",
        "location": "AMBA",
        "avatar": "I",
        "rating": 5,
        "comment": "Detectaron fallas que no veíamos. Excelente informe y seguimiento.",
        "type": "Institución",
        "approved": True
    }
]

WORK_IMAGES_DATA = [
    {
        "title": "Trabajo realizado - Ventilador PC",
        "description": "Mantenimiento y limpieza de ventiladores",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-ventilador-pc.jpg",
        "category": "Mantenimiento"
    },
    {
        "title": "Trabajo realizado - Ventilador PC 2", 
        "description": "Limpieza especializada de componentes",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-ventilador-pc-2.jpg",
        "category": "Mantenimiento"
    },
    {
        "title": "Trabajo realizado - Interior PC",
        "description": "Mantenimiento interno completo",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-interior-pc.jpg",
        "category": "Mantenimiento"
    },
    {
        "title": "Trabajo realizado - Reparación Impresora",
        "description": "Servicio técnico especializado en impresoras",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-reparacion-impresora.jpg",
        "category": "Impresoras"
    },
    {
        "title": "Trabajo realizado - Control PlayStation Rojo",
        "description": "Reparación de controles gaming",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-control-playstation-rojo.jpg",
        "category": "Gaming"
    },
    {
        "title": "Trabajo realizado - Controles PlayStation",
        "description": "Múltiples reparaciones de controles",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-controles-playstation.jpg",
        "category": "Gaming"
    },
    {
        "title": "Trabajo realizado - Control PlayStation Negro",
        "description": "Reparación especializada gaming",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-control-playstation-negro.jpg",
        "category": "Gaming"
    },
    {
        "title": "Trabajo realizado - Setup Gaming",
        "description": "Configuración completa gaming",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-setup-gaming.jpg",
        "category": "Armado"
    },
    {
        "title": "Trabajo realizado - Control PlayStation Detalle",
        "description": "Detalle de reparación gaming",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-control-playstation-detalle.jpg",
        "category": "Gaming"
    },
    {
        "title": "Trabajo realizado - Ventilador Laptop",
        "description": "Mantenimiento ventilador portátil",
        "image": "https://rgserviciotecnico.netlify.app/trabajo-ventilador-laptop.jpg",
        "category": "Mantenimiento"
    }
]

COMPANY_INFO_DATA = {
    "address": "Vicente López 1029",
    "city": "Lincoln, Buenos Aires, Argentina",
    "email": "rgst369@gmail.com",
    "phone": "2355-544386",
    "whatsapp": "5492355544386",
    "instagram": "@rgserviciotec",
    "hours": "Solo con cita previa - Contactanos para coordinar"
}

async def seed_database():
    """Seed the database with initial data"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("Seeding database...")
    
    # Clear existing data
    await db.services.delete_many({})
    await db.plans.delete_many({})
    await db.testimonials.delete_many({})
    await db.work_images.delete_many({})
    await db.company_info.delete_many({})
    
    # Insert services
    services = [Service(**service) for service in SERVICES_DATA]
    await db.services.insert_many([service.dict() for service in services])
    print(f"Inserted {len(services)} services")
    
    # Insert plans
    plans = [Plan(**plan) for plan in PLANS_DATA]
    await db.plans.insert_many([plan.dict() for plan in plans])
    print(f"Inserted {len(plans)} plans")
    
    # Insert testimonials
    testimonials = [Testimonial(**testimonial) for testimonial in TESTIMONIALS_DATA]
    await db.testimonials.insert_many([testimonial.dict() for testimonial in testimonials])
    print(f"Inserted {len(testimonials)} testimonials")
    
    # Insert work images
    work_images = [WorkImage(**work_image) for work_image in WORK_IMAGES_DATA]
    await db.work_images.insert_many([work_image.dict() for work_image in work_images])
    print(f"Inserted {len(work_images)} work images")
    
    # Insert company info
    company_info = CompanyInfo(**COMPANY_INFO_DATA)
    await db.company_info.insert_one(company_info.dict())
    print("Inserted company info")
    
    await client.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())