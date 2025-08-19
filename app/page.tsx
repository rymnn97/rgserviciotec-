"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Check,
  Menu,
  X,
  Moon,
  Sun,
  Star,
  Smartphone,
  Monitor,
  Printer,
  Wrench,
  Zap,
  Clock,
  Award,
  Users,
  MapPin,
  Mail,
  Phone,
  Instagram,
  ShoppingCart,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
)

interface CartItem {
  id: string
  name: string
  price: string
  frequency: string
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const carouselImages = [
    "/trabajo-ventilador-pc.jpg",
    "/trabajo-ventilador-pc-2.jpg",
    "/trabajo-interior-pc.jpg",
    "/trabajo-reparacion-impresora.jpg",
    "/trabajo-control-playstation-rojo.jpg",
    "/trabajo-controles-playstation.jpg",
    "/trabajo-control-playstation-negro.jpg",
    "/trabajo-setup-gaming.jpg",
    "/trabajo-control-playstation-detalle.jpg",
    "/trabajo-ventilador-laptop.jpg",
    "/trabajo-diagnostico-sistema.jpg",
    "/trabajo-control-camuflaje-blanco.jpg",
    "/trabajo-control-camuflaje.jpg",
    "/trabajo-puertos-laptop.jpg",
    "/trabajo-interior-laptop.jpg",
    "/trabajo-puertos-usb.jpg",
    "/trabajo-diagnostico-rendimiento.jpg",
    "/trabajo-ventilador-foxconn.jpg",
    "/trabajo-ventiladores-sucios.jpg",
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    const carouselInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 3000)

    const horizontalCarouselInterval = setInterval(() => {
      const carousel = document.querySelector(".horizontal-carousel")
      if (carousel) {
        const scrollAmount = 320 + 16 // width + gap
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" })

        // Reset to beginning when reaching the end
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) {
          setTimeout(() => {
            carousel.scrollTo({ left: 0, behavior: "smooth" })
          }, 2000)
        }
      }
    }, 4000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(carouselInterval)
      clearInterval(horizontalCarouselInterval)
    }
  }, [carouselImages.length])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const generateWhatsAppLink = (message: string) => {
    const phoneNumber = "5492355544386" // Argentina country code + number
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  }

  const generateInstagramDMLink = () => {
    return "https://ig.me/m/rgserviciotec"
  }

  const addToCart = (plan: { name: string; price: string; frequency: string }) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      name: plan.name,
      price: plan.price,
      frequency: plan.frequency,
    }
    setCartItems([newItem]) // Replace existing items instead of adding
    setShowCart(true)
  }

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const generateCartWhatsAppMessage = () => {
    if (cartItems.length === 0) return ""

    const item = cartItems[0]
    let message = `¡Hola! Me interesa contratar el plan "${item.name}" por ${item.price}/mes.\n\n`

    // Personalized message based on plan type
    if (item.name.includes("Básico")) {
      message +=
        "Me gustaría saber más detalles sobre el mantenimiento preventivo mensual y qué incluye exactamente el servicio."
    } else if (item.name.includes("Profesional")) {
      message +=
        "Necesito el servicio completo con soporte prioritario. ¿Podrían explicarme los beneficios del plan profesional?"
    } else if (item.name.includes("Empresarial")) {
      message +=
        "Represento a una empresa y necesitamos el plan completo con soporte 24/7. ¿Pueden brindarme información sobre los SLA y garantías?"
    } else {
      message += "¿Podrían brindarme más información sobre este plan y sus beneficios?"
    }

    message += "\n\n¿Cuándo podríamos coordinar una consulta?"
    return message
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    const message = generateCartWhatsAppMessage()
    const whatsappLink = generateWhatsAppLink(message)
    window.open(whatsappLink, "_blank")
    setCartItems([]) // Clear cart after checkout
    setShowCart(false)
  }

  const scrollToPlans = () => {
    const planesSection = document.getElementById("planes")
    if (planesSection) {
      planesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openImageModal = (imageSrc: string) => {
    const imageIndex = carouselImages.findIndex((img) => img === imageSrc)
    setSelectedImage(imageSrc)
    setCurrentImageIndex(imageIndex >= 0 ? imageIndex : 0)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setSelectedImage("")
  }

  const nextModalImage = () => {
    const nextIndex = (carouselImages.findIndex((img) => img === selectedImage) + 1) % carouselImages.length
    setSelectedImage(carouselImages[nextIndex])
  }

  const prevModalImage = () => {
    const currentIndex = carouselImages.findIndex((img) => img === selectedImage)
    const prevIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length
    setSelectedImage(carouselImages[prevIndex])
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const services = [
    {
      title: "Instalación Windows + Pack Office",
      description: "Tu computadora lista en menos de 24 horas. Instalación completa de Windows y Microsoft Office.",
      icon: <Monitor className="size-5 border-0 mx-0 px-0 py-0" />,
    },
    {
      title: "Servicio Técnico de Celulares",
      description: "Cambio de módulo, batería, pin de carga y lector de huella. Trabajamos con todas las marcas.",
      icon: <Smartphone className="size-5" />,
    },
    {
      title: "Armado de PC",
      description:
        "Instalación de sistema operativo, programas básicos, Microsoft Office y gestión de cableado profesional.",
      icon: <Monitor className="size-5" />,
    },
    {
      title: "Optimización",
      description: "Mejora de rendimiento, limpieza y mantenimiento del software, corrección de fallas en Windows.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Servicio de Impresoras",
      description: "Mantenimiento y reparación, cambio y reseteo de almohadillas, cambio de componentes.",
      icon: <Printer className="size-5" />,
    },
    {
      title: "Mantenimiento PC",
      description: "Revisión completa, limpieza detallada de componentes, cambio de pasta térmica CPU/GPU.",
      icon: <Wrench className="size-5" />,
    },
  ]

  const generateServiceWhatsAppMessage = (serviceTitle: string) => {
    const messages = {
      "Instalación Windows + Pack Office":
        "¡Hola! Necesito instalar Windows y Office en mi computadora. ¿Cuánto tiempo demora y cuál es el costo del servicio?",
      "Servicio Técnico de Celulares":
        "¡Hola! Tengo un problema con mi celular y necesito reparación. ¿Podrían revisar qué tipo de reparación necesita y darme un presupuesto?",
      "Armado de PC":
        "¡Hola! Quiero armar una PC nueva. ¿Me pueden ayudar con el armado, instalación del sistema y configuración completa?",
      Optimización:
        "¡Hola! Mi computadora está muy lenta y tiene problemas de rendimiento. ¿Pueden hacer una optimización completa del sistema?",
      "Servicio de Impresoras":
        "¡Hola! Tengo problemas con mi impresora y necesito servicio técnico. ¿Podrían revisar qué reparación necesita?",
      "Mantenimiento PC":
        "¡Hola! Mi PC necesita mantenimiento y limpieza. ¿Incluye cambio de pasta térmica y limpieza completa de componentes?",
    }
    return (
      messages[serviceTitle as keyof typeof messages] ||
      `¡Hola! Me interesa el servicio de "${serviceTitle}". ¿Podrían brindarme más información y presupuesto?`
    )
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg flex items-center justify-center">
              <Image src="/logo-nuevo.png" width={32} height={32} alt="RG Logo" className="rounded-lg" />
            </div>
            <span>RG Servicio Técnico</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#servicios"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Servicios
            </Link>
            <Link
              href="#nosotros"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Nosotros
            </Link>
            <Link
              href="#planes"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Planes
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contacto
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground hover:bg-accent"
              onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
            >
              <Instagram className="size-[18px]" />
              <span className="sr-only">Instagram</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative text-foreground hover:bg-accent"
              onClick={() =>
                window.open(
                  generateWhatsAppLink(
                    "¡Hola! Me interesa conocer más sobre sus servicios técnicos. ¿Podrían brindarme información?",
                  ),
                  "_blank",
                )
              }
            >
              <WhatsAppIcon className="size-[18px]" />
              <span className="sr-only">WhatsApp</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative text-foreground hover:bg-accent"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="size-[18px]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full size-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link href="#servicios" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Servicios
              </Link>
              <Link href="#nosotros" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Nosotros
              </Link>
              <Link href="#planes" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Planes
              </Link>
              <Link href="#contacto" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  className="rounded-full bg-transparent"
                  onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
                >
                  <Instagram className="mr-2 size-4" />
                  Instagram
                </Button>
                <Button
                  className="rounded-full bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open(
                      generateWhatsAppLink(
                        "¡Hola! Me interesa conocer más sobre sus servicios técnicos. ¿Podrían brindarme información?",
                      ),
                      "_blank",
                    )
                  }
                >
                  <WhatsAppIcon className="mr-2 size-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-background/95 backdrop-blur-lg border rounded-lg shadow-lg z-50"
          >
            <div className="p-4">
              <h3 className="font-bold mb-4 text-foreground">Carrito de Compras</h3>
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.price}/mes - {item.frequency}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-6" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleCheckout}>
                    <WhatsAppIcon className="mr-2 size-4" />
                    Finalizar por WhatsApp
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] md:max-w-[70vw] md:max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={prevModalImage}
            >
              <ChevronLeft className="size-6" />
            </Button>

            <Image
              src={selectedImage || "/placeholder.svg"}
              width={1200}
              height={900}
              alt="Imagen ampliada"
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg md:max-w-[60vw] md:max-h-[70vh]"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={nextModalImage}
            >
              <ChevronRight className="size-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              onClick={closeImageModal}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                variant="secondary"
              >
                Servicio Técnico Profesional
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
                Hablemos de lo que necesita tu equipo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Especialistas en reparación de PC, notebooks, consolas y celulares. Servicio técnico profesional con
                garantía y trato personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open(
                      generateWhatsAppLink(
                        "¡Hola! Vi su página web y me interesa conocer más sobre sus servicios técnicos. ¿Podrían ayudarme?",
                      ),
                      "_blank",
                    )
                  }
                >
                  <WhatsAppIcon className="mr-2 size-4" />
                  Escríbenos por WhatsApp
                </Button>
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => window.open(generateInstagramDMLink(), "_blank")}
                >
                  <Instagram className="mr-2 size-4" />
                  Escríbenos por Instagram
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`rounded-full h-12 px-8 text-base ${
                    theme === "dark" ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                  }`}
                  onClick={scrollToPlans}
                >
                  Ver Planes
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-blue-600" />
                  <span>Garantía incluida</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-blue-600" />
                  <span>Trato personalizado</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-blue-600" />
                  <span>Todas las marcas</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-600/30 to-green-600/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-green-600/30 to-blue-600/30 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>

        {/* Gallery/Portfolio Section */}
        <section className="w-full py-20 md:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground mb-4">
                Trabajos Realizados
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Una muestra de nuestra dedicación y calidad
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="horizontal-carousel flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {Array.from({ length: 20 }, (_, i) => {
                  const imageIndex = i % carouselImages.length
                  return (
                    <div key={i} className="flex-shrink-0 w-80">
                      <div className="bg-gray-800 dark:bg-gray-700 rounded-2xl p-4">
                        <Image
                          src={carouselImages[imageIndex] || "/placeholder.svg"}
                          width={320}
                          height={240}
                          alt={`Trabajo realizado ${i + 1}`}
                          className="w-full h-60 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openImageModal(carouselImages[imageIndex])}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Servicios
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nuestros Servicios</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Soluciones completas para todos tus equipos tecnológicos
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-blue-600/10 dark:bg-blue-600/20 flex text-blue-600 mr-px ml-px h-10 items-center gap-0 mb-2 px-0 py-0 w-10 border-0 flex-col justify-evenly">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() =>
                          window.open(generateWhatsAppLink(generateServiceWhatsAppMessage(service.title)), "_blank")
                        }
                      >
                        Más información
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="nosotros" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Por qué elegirnos
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Tres pilares que nos distinguen</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Nuestra experiencia y dedicación nos convierten en la mejor opción para el cuidado de tus equipos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  icon: <Clock className="size-8" />,
                  title: "Rapidez",
                  description:
                    "Diagnósticos precisos y reparaciones eficientes. Tu equipo listo en el menor tiempo posible.",
                },
                {
                  icon: <Award className="size-8" />,
                  title: "Calidad",
                  description:
                    "Componentes originales, herramientas profesionales y garantía en todos nuestros trabajos.",
                },
                {
                  icon: <Users className="size-8" />,
                  title: "Trato personalizado",
                  description:
                    "Atención dedicada y asesoramiento técnico adaptado a las necesidades específicas de cada cliente.",
                },
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Testimonios
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Experiencias reales, resultados medibles
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "Nos dejaron 20 PCs como nuevas. Bajó el ruido, bajó la temperatura y subió el rendimiento.",
                  author: "Escuela Técnica N°3",
                  role: "Lincoln, Buenos Aires",
                  rating: 5,
                },
                {
                  quote: "Respuesta clara y rápida. El plan 'Rendimiento Óptimo' nos ahorró horas de soporte.",
                  author: "PyME Metalúrgica",
                  role: "Zona Oeste",
                  rating: 5,
                },
                {
                  quote: "Detectaron fallas que no veíamos. Excelente informe y seguimiento.",
                  author: "Instituto Privado",
                  role: "AMBA",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="planes" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Planes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Planes de Suscripción</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Mantené tus equipos siempre en perfecto estado
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: "Prevención Esencial",
                  price: "$13.800",
                  frequency: "Trimestral",
                  description: "Ideal para prevenir fallas y mantener equipos en buen estado",
                  features: [
                    "Limpieza interna y externa de PCs y notebooks",
                    "Revisión física y cambio pasta térmica anual",
                    "Actualizaciones de software y parches",
                    "Informe de estado general de cada equipo",
                  ],
                  cta: "Seleccionar",
                  icon: "💼",
                },
                {
                  name: "Rendimiento Óptimo",
                  price: "$37.600",
                  frequency: "Bimestral",
                  description: "Perfecto para uso diario y máximo rendimiento",
                  features: [
                    "Todo lo del Plan Prevención Esencial",
                    "Optimización de sistema operativo",
                    "Mantenimiento preventivo de impresoras",
                    "Reemplazo piezas menores sin costo",
                    "Respaldo básico de información",
                  ],
                  cta: "Seleccionar",
                  popular: true,
                  icon: "⚡",
                },
                {
                  name: "Soporte Total",
                  price: "$95.800",
                  frequency: "Mensual + Asistencia Remota",
                  description: "Para empresas que necesitan prioridad y mínima interrupción",
                  features: [
                    "Todo lo del Plan Rendimiento Óptimo",
                    "Asistencia remota (3 intervenciones/mes)",
                    "Respuesta prioritaria en menos de 24hs",
                    "Monitoreo preventivo continuo",
                  ],
                  cta: "Seleccionar",
                  icon: "🚀",
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card
                    className={`relative overflow-hidden h-full ${plan.popular ? "border-blue-600 shadow-lg" : "border-border/40 shadow-md"} bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                        Recomendado
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{plan.icon}</span>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                      </div>
                      <div className="flex items-baseline mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">/mes por equipo</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Frecuencia: {plan.frequency}</p>
                      <p className="text-muted-foreground mt-2">{plan.description}</p>
                      <ul className="space-y-3 my-6 flex-grow">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start">
                            <Check className="mr-2 size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mb-4">
                        Descuentos por volumen: 5 equipos (5%), 10 equipos (10%), 20+ equipos (20%)
                      </p>
                      <Button
                        className={`w-full mt-auto rounded-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-muted hover:bg-muted/80"}`}
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => addToCart(plan)}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Contacto
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Consultanos sin compromiso</h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-muted-foreground">
                        Vicente López 1029
                        <br />
                        Lincoln, Buenos Aires, Argentina
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="size-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">rgst369@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-muted-foreground">2355-544386</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Horarios</p>
                      <p className="text-muted-foreground">
                        Solo con cita previa
                        <br />
                        Contactanos para coordinar
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Instagram className="size-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <button
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                        onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
                      >
                        @rgserviciotec
                      </button>
                    </div>
                  </div>
                  <div className="pt-4"></div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Enviar Consulta</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nombre</label>
                    <Input id="contact-name" className="w-full mt-1" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mensaje</label>
                    <Textarea
                      id="contact-message"
                      className="w-full mt-1"
                      placeholder="Describe tu consulta..."
                    ></Textarea>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full h-12 px-8 text-base bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      const nameInput = document.querySelector('input[placeholder="Tu nombre"]') as HTMLInputElement
                      const messageInput = document.querySelector(
                        'textarea[placeholder="Describe tu consulta..."]',
                      ) as HTMLTextAreaElement

                      const name = nameInput?.value || "Cliente"
                      const message = messageInput?.value || "Consulta general"

                      const customMessage = `Hola, soy ${name}. ${message}`
                      window.open(generateWhatsAppLink(customMessage), "_blank")
                    }}
                  >
                    <WhatsAppIcon className="mr-2 size-4" />
                    Enviar por WhatsApp
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                ¿Listo para mejorar el rendimiento de tu equipo?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Optimizamos, reparamos y damos soporte técnico para que todo funcione como debe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-green-600 hover:bg-green-700 text-white border-0"
                  onClick={() =>
                    window.open(
                      generateWhatsAppLink(
                        "¡Hola! Estoy listo para mejorar el rendimiento de mi equipo. ¿Podrían ayudarme con sus servicios?",
                      ),
                      "_blank",
                    )
                  }
                >
                  <WhatsAppIcon className="mr-2 size-4" />
                  Contactar por WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
                  onClick={() => window.open(generateInstagramDMLink(), "_blank")}
                >
                  <Instagram className="mr-2 size-4" />
                  Contactar por Instagram
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                  onClick={scrollToPlans}
                >
                  Ver Planes
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-lg flex items-center justify-center">
                  <Image src="/logo-nuevo.png" width={32} height={32} alt="RG Logo" className="rounded-lg" />
                </div>
                <span>RG Servicio Técnico</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Especialistas en reparación de PC, notebooks, consolas y celulares. Servicio técnico profesional con
                garantía.
              </p>
              <div className="flex gap-4">
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() =>
                    window.open(
                      generateWhatsAppLink("¡Hola! Me interesa contactarlos para conocer más sobre sus servicios."),
                      "_blank",
                    )
                  }
                >
                  <WhatsAppIcon className="size-5" />
                  <span className="sr-only">WhatsApp</span>
                </button>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => window.open("https://instagram.com/rgserviciotec", "_blank")}
                >
                  <Instagram className="size-5" />
                  <span className="sr-only">Instagram</span>
                </button>
                <Link
                  href="mailto:rgst369@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="size-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Servicios</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Reparación PC
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Servicio Celulares
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mantenimiento
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Asistencia Remota
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#nosotros" className="text-muted-foreground hover:text-foreground transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#planes" className="text-muted-foreground hover:text-foreground transition-colors">
                    Planes
                  </Link>
                </li>
                <li>
                  <Link href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  Vicente López 1029
                  <br />
                  Lincoln, Buenos Aires
                </li>
                <li className="text-muted-foreground">2355-544386</li>
                <li className="text-muted-foreground">rgst369@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} RG Servicio Técnico. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Términos de Servicio
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
