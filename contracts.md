# RG Servicio Técnico - Contratos API y Integración

## API Endpoints Necesarios

### 1. Contacto y Consultas
- **POST /api/contact** - Enviar consulta de contacto
- **GET /api/contact** - Obtener consultas (admin)

### 2. Servicios
- **GET /api/services** - Obtener lista de servicios
- **GET /api/services/:id** - Obtener servicio específico

### 3. Testimonios
- **GET /api/testimonials** - Obtener testimonios
- **POST /api/testimonials** - Crear nuevo testimonio

### 4. Planes
- **GET /api/plans** - Obtener planes de suscripción
- **POST /api/plans/subscribe** - Suscribirse a un plan

### 5. Trabajos Realizados
- **GET /api/work** - Obtener galería de trabajos

### 6. Información de la empresa
- **GET /api/company-info** - Obtener información de contacto

## Datos Mock a Reemplazar

### Frontend Mock Data (/src/data/mockData.js)
- **workImages**: Cambiar por imágenes reales de trabajos
- **services**: Usar servicios exactos del sitio original
- **testimonials**: Testimonios reales
- **plans**: Precios y planes exactos
- **contactInfo**: Información real de contacto

### Integración Frontend-Backend
- Reemplazar imports de mockData con llamadas a API
- Implementar manejo de estados de carga
- Agregar manejo de errores
- Implementar formularios funcionales

## Funcionalidades del Backend

### 1. Modelos de Datos
- ContactMessage: Almacenar consultas
- Service: Información de servicios
- Testimonial: Testimonios de clientes
- Plan: Planes de suscripción
- WorkImage: Galería de trabajos
- CompanyInfo: Información de la empresa

### 2. Validaciones
- Validación de emails
- Validación de campos requeridos
- Sanitización de datos

### 3. Integración Externa
- WhatsApp API para envío de mensajes
- Email notifications
- Analytics tracking

## Pasos de Implementación

1. **Actualizar datos mock con información real**
2. **Crear modelos de MongoDB**
3. **Implementar endpoints de API**
4. **Crear seeders con datos reales**
5. **Integrar frontend con backend**
6. **Testing completo**
7. **Optimización y deployment**