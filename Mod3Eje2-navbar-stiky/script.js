// =====================================
// NAVBAR STICKY MODERNO - JAVASCRIPT
// =====================================

// Elementos del DOM
const navbar = document.getElementById('navbar');
const navProgress = document.getElementById('navProgress');
const btnTop = document.getElementById('btnTop');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const btnExplore = document.getElementById('btnExplore');
const btnLearnMore = document.getElementById('btnLearnMore');
const contactForm = document.getElementById('contactForm');
const featureBtns = document.querySelectorAll('.feature-btn');
const pricingBtns = document.querySelectorAll('.pricing-btn');

// =====================================
// NOTIFICACIONES TOAST
// =====================================

function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// =====================================
// NAVBAR SCROLL EFFECTS
// =====================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Añadir clase scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Barra de progreso
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (currentScroll / windowHeight) * 100;
    navProgress.style.width = scrolled + '%';
    
    // Mostrar botón volver arriba
    if (currentScroll > 300) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// =====================================
// VOLVER ARRIBA
// =====================================

btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    showToast('¡Arriba!', 'Has vuelto al inicio de la página');
});

// =====================================
// MENÚ HAMBURGUESA
// =====================================

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// =====================================
// HIGHLIGHT ACTIVE SECTION
// =====================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =====================================
// SMOOTH SCROLL CON OFFSET
// =====================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// =====================================
// BOTONES HERO
// =====================================

if (btnExplore) {
    btnExplore.addEventListener('click', () => {
        showToast('🚀 ¡Explorando!', 'Desplazándote a la sección de características');
        
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = featuresSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

if (btnLearnMore) {
    btnLearnMore.addEventListener('click', () => {
        showToast('📖 Aprendiendo', 'Te mostramos todo sobre position: sticky');
        setTimeout(() => {
            window.open('https://developer.mozilla.org/es/docs/Web/CSS/position', '_blank');
        }, 1000);
    });
}

// =====================================
// BOTONES DE FEATURES
// =====================================

featureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const feature = btn.getAttribute('data-feature');
        const featureNames = {
            'sticky': 'Position Sticky',
            'flow': 'Flujo del Documento',
            'performance': 'Alto Rendimiento',
            'dynamic': 'Estilos Dinámicos'
        };
        
        showToast(
            `✨ ${featureNames[feature]}`,
            'Esta característica hace que tu navbar sea increíble'
        );
        
        // Efecto de ripple
        createRipple(btn, event);
    });
});

// =====================================
// BOTONES DE PRICING
// =====================================

pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        const planNames = {
            'basic': 'Plan Básico',
            'pro': 'Plan Pro',
            'enterprise': 'Plan Enterprise'
        };
        
        showToast(
            `💎 ${planNames[plan]} Seleccionado`,
            '¡Excelente elección! Redirigiendo al checkout...'
        );
        
        // Animación del botón
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
        
        // Simular redirección
        setTimeout(() => {
            showToast('🎉 ¡Bienvenido!', 'Tu cuenta ha sido creada exitosamente');
        }, 2000);
    });
});

// =====================================
// FORMULARIO DE CONTACTO
// =====================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validar
        if (!name || !email || !subject || !message) {
            showToast('❌ Error', 'Por favor completa todos los campos', 'error');
            return;
        }
        
        // Mostrar loading
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.disabled = true;
        
        // Simular envío
        setTimeout(() => {
            showToast(
                '✅ ¡Mensaje Enviado!',
                `Gracias ${name}, te responderemos pronto a ${email}`
            );
            
            // Reset form
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    });
}

// =====================================
// EFECTO RIPPLE
// =====================================

function createRipple(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// =====================================
// EFECTOS DE PARALLAX
// =====================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.15;
        particle.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.05}px)`;
    });
});

// =====================================
// ANIMACIONES DE ENTRADA
// =====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.feature-card, .pricing-card, .testimonial').forEach(el => {
    observer.observe(el);
});

// =====================================
// AÑADIR ANIMACIONES CSS
// =====================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Testimonials, Contact Form, Footer */
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
    .testimonial { background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); transition: var(--transition); border-left: 4px solid var(--color-primary); }
    .testimonial:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); }
    .testimonial-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
    .testimonial-avatar { width: 50px; height: 50px; border-radius: 50%; background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; }
    .testimonial-info { flex: 1; }
    .testimonial-info h4 { font-weight: 700; margin-bottom: 0.25rem; }
    .testimonial-info p { font-size: 0.9rem; color: var(--color-text-light); }
    .testimonial-rating { font-size: 0.9rem; }
    .testimonial-text { color: var(--color-text-light); line-height: 1.8; font-style: italic; }
    
    .contact-form { max-width: 700px; margin: 0 auto; }
    .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; }
    .form-group input, .form-group textarea { width: 100%; padding: 1rem 1.25rem; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1rem; transition: var(--transition); font-family: inherit; }
    .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1); }
    
    .footer { background: var(--color-text); color: white; padding: 3rem 0 1.5rem; }
    .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 2rem; }
    .footer-brand p { opacity: 0.8; margin-top: 1rem; }
    .footer-links h4, .footer-social h4 { margin-bottom: 1rem; }
    .footer-links ul { list-style: none; }
    .footer-links li { margin-bottom: 0.75rem; }
    .footer-links a { color: rgba(255,255,255,0.8); text-decoration: none; transition: var(--transition); }
    .footer-links a:hover { color: white; padding-left: 0.5rem; }
    .social-icons { display: flex; gap: 1rem; }
    .social-icon { width: 45px; height: 45px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 1.3rem; transition: var(--transition); }
    .social-icon:hover { background: var(--gradient-primary); transform: translateY(-5px); }
    .footer-bottom { text-align: center; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
    .footer-bottom p { opacity: 0.7; margin-bottom: 0.5rem; }
    
    @media (max-width: 768px) {
        .nav-toggle { display: flex; }
        .nav-menu { position: fixed; left: -100%; top: var(--nav-height); flex-direction: column; background: white; width: 100%; padding: 2rem 0; box-shadow: var(--shadow-lg); transition: left 0.3s ease; align-items: stretch; }
        .nav-menu.active { left: 0; }
        .nav-link { width: 90%; margin: 0 auto; text-align: center; justify-content: center; }
        .gradient-text { font-size: 2.5rem; }
        .hero-subtitle { font-size: 1.1rem; }
        .section-header h2 { font-size: 2rem; }
        .testimonials-grid { grid-template-columns: 1fr; }
    }
`;
document.head.appendChild(style);

// =====================================
// MENSAJE DE BIENVENIDA
// =====================================

console.log('%c🚀 Navbar Sticky Moderno Cargado', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Características:', 'color: #38ef7d; font-size: 14px; font-weight: bold;');
console.log('  • 📌 Position: sticky con efectos modernos');
console.log('  • 📊 Barra de progreso de scroll');
console.log('  • 🎨 Gradientes y animaciones fluidas');
console.log('  • 🔔 Sistema de notificaciones toast');
console.log('  • 📱 Menú responsive con hamburguesa');
console.log('  • ⚡ Smooth scroll y parallax');
console.log('  • 🎯 Highlight de sección activa');

// Mensaje inicial
setTimeout(() => {
    showToast('👋 ¡Bienvenido!', 'Explora todas las características del navbar sticky');
}, 1500);