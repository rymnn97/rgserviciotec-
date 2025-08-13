/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
  });

  // Cerrar al hacer click en un link (mobile)
  navMenu.querySelectorAll('a.nav__link').forEach(a => {
    a.addEventListener('click', () => navMenu.classList.remove('is-open'));
  });
}

/* ---------- Smooth scroll para links internos ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: 'smooth'
    });
  });
});

/* ---------- WhatsApp desde formulario ---------- */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = encodeURIComponent(document.getElementById('nombre').value.trim());
    const tel = encodeURIComponent(document.getElementById('telefono').value.trim());
    const msg = encodeURIComponent(document.getElementById('mensaje').value.trim());
    const texto = `Hola! Soy ${nombre}. Tel: ${tel}. Consulta: ${msg}`;
    window.open(`https://wa.me/542355544386?text=${texto}`, '_blank');
  });
}

/* ---------- Carousel de trabajos realizados ---------- */
$(document).ready(function(){
  $('.carousel').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 2
      }
    }]
  });
});

/* ---------- Carrito muy simple para Planes ---------- */
const cartToggle = document.getElementById('cart-toggle');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const cartItem = document.getElementById('cart-item');
const cartItemName = document.getElementById('cart-item-name');
const cartItemPrice = document.getElementById('cart-item-price');
const cartEmpty = document.getElementById('cart-empty');
const cartTotal = document.getElementById('cart-total');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartClear = document.getElementById('cart-clear');
const cartCheckout = document.getElementById('cart-checkout');
const cartCount = document.getElementById('cart-count');

function openCart(){ cartDrawer.classList.add('is-open'); }
function closeCart(){ cartDrawer.classList.remove('is-open'); }

if (cartToggle) cartToggle.addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);

// Añadir plan al carrito
document.querySelectorAll('.plan-card__button').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.plan-card');
    const name = card?.dataset?.planName || card?.querySelector('.plan-card__title')?.textContent?.trim() || 'Plan';
    const price = Number(card?.dataset?.planPrice || 0);

    cartItemName.textContent = name;
    cartItemPrice.textContent = `$ ${price.toLocaleString('es-AR')}/mes por equipo`;
    cartTotalAmount.textContent = `$ ${price.toLocaleString('es-AR')}`;
    cartEmpty.style.display = 'none';
    cartItem.style.display = 'block';
    cartTotal.style.display = 'block';
    cartCount.textContent = '1'; // simple: 1 ítem

    openCart();
  });
});

if (cartClear){
  cartClear.addEventListener('click', ()=>{
    cartItem.style.display='none';
    cartTotal.style.display='none';
    cartEmpty.style.display='block';
    cartCount.textContent='0';
  });
}

if (cartCheckout){
  cartCheckout.addEventListener('click', ()=>{
    const plan = cartItemName.textContent || 'Plan';
    const total = cartTotalAmount.textContent || '';
    const texto = encodeURIComponent(`Hola! Quiero contratar ${plan}. Total estimado: ${total} por equipo/mes.`);
    window.open(`https://wa.me/542355544386?text=${texto}`, '_blank');
  });
}
