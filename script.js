/**
 * RG Servicio Técnico - Main JavaScript
 * Handles navigation, cart functionality, form validation, and animations
 */

// DOM Elements
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const cartToggle = document.getElementById('cart-toggle');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartCount = document.getElementById('cart-count');
const cartItem = document.getElementById('cart-item');
const cartEmpty = document.getElementById('cart-empty');
const cartTotal = document.getElementById('cart-total');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartItemName = document.getElementById('cart-item-name');
const cartItemPrice = document.getElementById('cart-item-price');
const cartClear = document.getElementById('cart-clear');
const cartCheckout = document.getElementById('cart-checkout');

// Cart state
let selectedPlan = null;

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCart();
    initContactForm();
    initScrollAnimations();
    loadCartFromStorage();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    // Mobile menu toggle
    navToggle?.addEventListener('click', function() {
        const isOpen = navMenu.classList.contains('show');
        
        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    });

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeNav();
        });
    });

    // Sticky navigation on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            if (currentScrollY > 100) {
                nav.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            } else {
                nav.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = nav?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function openNav() {
    navMenu?.classList.add('show');
    navToggle?.classList.add('active');
    navToggle?.setAttribute('aria-expanded', 'true');
    
    // Trap focus within menu
    const firstLink = navMenu?.querySelector('.nav__link');
    firstLink?.focus();
}

function closeNav() {
    navMenu?.classList.remove('show');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
}

/**
 * Shopping Cart functionality
 */
function initCart() {
    // Plan selection buttons
    const planButtons = document.querySelectorAll('.plan-card__button');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            if (planCard) {
                const planData = {
                    id: planCard.dataset.planId,
                    name: planCard.dataset.planName,
                    price: parseInt(planCard.dataset.planPrice)
                };
                selectPlan(planData);
            }
        });
    });

    // Cart toggle
    cartToggle?.addEventListener('click', openCart);

    // Close cart
    cartClose?.addEventListener('click', closeCart);
    cartBackdrop?.addEventListener('click', closeCart);

    // Cart actions
    cartClear?.addEventListener('click', clearCart);
    cartCheckout?.addEventListener('click', checkout);

    // Keyboard navigation for cart
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartDrawer?.getAttribute('aria-hidden') === 'false') {
            closeCart();
        }
    });
}

function selectPlan(planData) {
    selectedPlan = planData;
    updateCartDisplay();
    saveCartToStorage();
    
    // Show success feedback
    showNotification(`Plan ${planData.name} seleccionado`, 'success');
    
    // Animate cart button
    if (cartToggle) {
        cartToggle.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            cartToggle.style.animation = '';
        }, 500);
    }
}

function updateCartDisplay() {
    if (selectedPlan) {
        // Update cart count
        if (cartCount) {
            cartCount.textContent = '1';
            cartCount.classList.add('show');
        }

        // Show cart item
        if (cartItem && cartEmpty) {
            cartItem.style.display = 'block';
            cartEmpty.style.display = 'none';
        }

        // Update item details
        if (cartItemName) {
            cartItemName.textContent = `Plan ${selectedPlan.name}`;
        }
        
        if (cartItemPrice) {
            cartItemPrice.textContent = formatCurrency(selectedPlan.price);
        }

        // Update total
        if (cartTotal && cartTotalAmount) {
            cartTotal.style.display = 'block';
            cartTotalAmount.textContent = formatCurrency(selectedPlan.price);
        }
    } else {
        // Hide cart count
        if (cartCount) {
            cartCount.textContent = '0';
            cartCount.classList.remove('show');
        }

        // Show empty state
        if (cartItem && cartEmpty) {
            cartItem.style.display = 'none';
            cartEmpty.style.display = 'block';
        }

        // Hide total
        if (cartTotal) {
            cartTotal.style.display = 'none';
        }
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(amount);
}

function openCart() {
    if (cartDrawer) {
        cartDrawer.setAttribute('aria-hidden', 'false');
        
        // Focus first interactive element
        setTimeout(() => {
            cartClose?.focus();
        }, 100);
    }
}

function closeCart() {
    if (cartDrawer) {
        cartDrawer.setAttribute('aria-hidden', 'true');
        cartToggle?.focus();
    }
}

function clearCart() {
    selectedPlan = null;
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Carrito vaciado', 'info');
}

function checkout() {
    const baseUrl = 'https://wa.me/542355544386';
    let message;
    
    if (selectedPlan) {
        const formattedPrice = formatCurrency(selectedPlan.price);
        message = `Hola, quiero contratar el plan ${selectedPlan.name} por ${formattedPrice}/mes.`;
    } else {
        message = 'Hola, tengo una consulta sobre los planes de suscripción.';
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${baseUrl}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeCart();
}

/**
 * LocalStorage functions for cart persistence
 */
function saveCartToStorage() {
    try {
        localStorage.setItem('rgservicio_cart', JSON.stringify(selectedPlan));
    } catch (error) {
        console.warn('Could not save cart to localStorage:', error);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('rgservicio_cart');
        if (savedCart) {
            selectedPlan = JSON.parse(savedCart);
            updateCartDisplay();
        }
    } catch (error) {
        console.warn('Could not load cart from localStorage:', error);
    }
}

/**
 * Contact form validation and handling
 */
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const nombre = formData.get('nombre')?.trim();
        const telefono = formData.get('telefono')?.trim();
        const mensaje = formData.get('mensaje')?.trim();
        
        // Clear previous errors
        clearFormErrors();
        
        let isValid = true;
        
        // Validate nombre
        if (!nombre || nombre.length < 2) {
            showFormError('nombre', 'Por favor ingrese un nombre válido');
            isValid = false;
        }
        
        // Validate telefono
        if (!telefono || telefono.length < 8) {
            showFormError('telefono', 'Por favor ingrese un teléfono válido');
            isValid = false;
        }
        
        // Validate mensaje
        if (!mensaje || mensaje.length < 10) {
            showFormError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }
        
        if (isValid) {
            // Create WhatsApp message
            const whatsappMessage = `Hola, mi nombre es ${nombre}. Teléfono: ${telefono}. ${mensaje}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/542355544386?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            
            // Reset form and show success message
            this.reset();
            showNotification('Mensaje enviado. Te contactaremos pronto.', 'success');
        }
    });
}

function showFormError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'var(--color-error)';
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form__error');
    const inputElements = document.querySelectorAll('.form__input, .form__textarea');
    
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    inputElements.forEach(input => {
        input.style.borderColor = '';
    });
}

/**
 * Scroll animations and intersection observer
 */
function initScrollAnimations() {
    // Check if animations should be reduced
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe pillars
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach((pillar, index) => {
        pillar.style.opacity = '0';
        pillar.style.transform = 'translateY(30px)';
        pillar.style.animationDelay = `${index * 0.2}s`;
        observer.observe(pillar);
    });

    // Observe plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Notification system
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-primary)'};
        color: white;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Performance optimizations
 */

// Lazy load images when they're about to enter viewport
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Debounced scroll handler for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //   .then((registration) => {
        //     console.log('SW registered: ', registration);
        //   })
        //   .catch((registrationError) => {
        //     console.log('SW registration failed: ', registrationError);
        //   });
    });
}

/**
 * Analytics and tracking (placeholder functions)
 * TODO: Implement with your preferred analytics service
 */
function trackPlanSelection(planName) {
    console.log('Plan selected:', planName);
    // Example: gtag('event', 'select_item', { item_name: planName });
}

function trackFormSubmission() {
    console.log('Contact form submitted');
    // Example: gtag('event', 'form_submit', { form_name: 'contact' });
}

function trackWhatsAppClick(source) {
    console.log('WhatsApp clicked from:', source);
    // Example: gtag('event', 'click', { event_category: 'contact', event_label: source });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        selectPlan,
        clearCart,
        showNotification
    };
}
