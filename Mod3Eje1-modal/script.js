// =====================================
// MODAL MODERNO - FUNCIONALIDADES
// =====================================

// Elementos del DOM
const btnOpen = document.querySelector('.btn-open');
const btnInfo = document.querySelector('.btn-info');
const btnClose = document.querySelector('.btn-close');
const modalOverlay = document.querySelector('#modalOverlay');
const btnModalAction = document.querySelector('.btn-modal-action');
const btnModalSecondary = document.querySelector('.btn-modal-secondary');
const modal = document.querySelector('.modal');

// Estado del modal
let isModalOpen = false;

// =====================================
// FUNCIONES PRINCIPALES
// =====================================

/**
 * Abre el modal con animaciones
 */
function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isModalOpen = true;
    
    // Añadir animación de entrada
    modal.style.animation = 'modalEntry 0.5s ease';
    
    // Reproducir sonido (opcional)
    playSound('open');
    
    // Log para debugging
    console.log('✅ Modal abierto');
}

/**
 * Cierra el modal con animaciones
 */
function closeModal() {
    modal.style.animation = 'modalExit 0.4s ease';
    
    setTimeout(() => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        isModalOpen = false;
    }, 300);
    
    // Reproducir sonido (opcional)
    playSound('close');
    
    // Log para debugging
    console.log('❌ Modal cerrado');
}

/**
 * Muestra un modal informativo alternativo
 */
function showInfoModal() {
    const modalBody = modal.querySelector('.modal-body');
    const originalContent = modalBody.innerHTML;
    
    // Cambiar contenido temporalmente
    modalBody.innerHTML = `
        <div class="info-modal-content">
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
                <h3 style="color: var(--color-text); font-size: 1.8rem; margin-bottom: 1rem;">
                    Información Técnica
                </h3>
            </div>
            
            <div style="background: linear-gradient(145deg, #f7fafc, #edf2f7); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h4 style="color: var(--color-text); margin-bottom: 1rem;">🎨 Características CSS:</h4>
                <ul style="list-style: none; padding: 0; color: var(--color-text-light);">
                    <li style="margin-bottom: 0.5rem;">✓ Position: fixed para overlay</li>
                    <li style="margin-bottom: 0.5rem;">✓ Flexbox para centrado perfecto</li>
                    <li style="margin-bottom: 0.5rem;">✓ Backdrop-filter para efecto blur</li>
                    <li style="margin-bottom: 0.5rem;">✓ CSS Animations con keyframes</li>
                    <li style="margin-bottom: 0.5rem;">✓ Cubic-bezier para transiciones suaves</li>
                </ul>
            </div>
            
            <div style="background: linear-gradient(145deg, #f7fafc, #edf2f7); padding: 1.5rem; border-radius: 12px;">
                <h4 style="color: var(--color-text); margin-bottom: 1rem;">⚙️ Funcionalidades JavaScript:</h4>
                <ul style="list-style: none; padding: 0; color: var(--color-text-light);">
                    <li style="margin-bottom: 0.5rem;">✓ Event listeners múltiples</li>
                    <li style="margin-bottom: 0.5rem;">✓ Control con teclado (ESC)</li>
                    <li style="margin-bottom: 0.5rem;">✓ Prevención de scroll del body</li>
                    <li style="margin-bottom: 0.5rem;">✓ Click outside to close</li>
                    <li style="margin-bottom: 0.5rem;">✓ Animaciones programáticas</li>
                </ul>
            </div>
        </div>
    `;
    
    openModal();
    
    // Restaurar contenido original al cerrar
    const restoreContent = () => {
        setTimeout(() => {
            modalBody.innerHTML = originalContent;
        }, 400);
        btnModalAction.removeEventListener('click', restoreAndClose);
    };
    
    const restoreAndClose = () => {
        closeModal();
        restoreContent();
    };
    
    btnModalAction.addEventListener('click', restoreAndClose);
}

// =====================================
// EFECTOS DE SONIDO (VISUAL)
// =====================================

function playSound(type) {
    // Simular feedback visual de sonido
    const soundIndicator = document.createElement('div');
    soundIndicator.textContent = type === 'open' ? '🔊' : '🔇';
    soundIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        font-size: 2rem;
        animation: soundPulse 0.5s ease;
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(soundIndicator);
    
    setTimeout(() => {
        soundIndicator.remove();
    }, 500);
}

// =====================================
// EVENT LISTENERS
// =====================================

// Abrir modal
if (btnOpen) {
    btnOpen.addEventListener('click', () => {
        // Añadir efecto de ripple
        createRipple(btnOpen, event);
        openModal();
    });
}

// Botón de información
if (btnInfo) {
    btnInfo.addEventListener('click', () => {
        createRipple(btnInfo, event);
        showInfoModal();
    });
}

// Cerrar con botón X
if (btnClose) {
    btnClose.addEventListener('click', () => {
        closeModal();
    });
}

// Cerrar con botón de acción
if (btnModalAction) {
    btnModalAction.addEventListener('click', () => {
        closeModal();
        
        // Mostrar mensaje de confirmación
        showNotification('¡Perfecto!', 'Has entendido cómo funciona el modal 🎉');
    });
}

// Botón secundario
if (btnModalSecondary) {
    btnModalSecondary.addEventListener('click', () => {
        showNotification('📖 Documentación', 'Abriendo recursos de aprendizaje...');
        
        // Simular apertura de documentación
        setTimeout(() => {
            console.log('📚 Documentación disponible en: https://developer.mozilla.org/');
        }, 1000);
    });
}

// Cerrar al hacer clic fuera del modal
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

// Prevenir cierre al hacer clic dentro del modal
if (modal) {
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// =====================================
// EFECTOS ADICIONALES
// =====================================

/**
 * Crea efecto ripple en botones
 */
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
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Muestra notificaciones tipo toast
 */
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.5s ease;
        border-left: 4px solid #667eea;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: start; gap: 1rem;">
            <div style="font-size: 1.5rem;">✅</div>
            <div>
                <div style="font-weight: 700; color: #2d3748; margin-bottom: 0.25rem;">${title}</div>
                <div style="font-size: 0.9rem; color: #718096;">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

/**
 * Efecto parallax en scroll
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// =====================================
// ANIMACIONES DINÁMICAS
// =====================================

// Añadir keyframes dinámicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes modalEntry {
        0% {
            transform: scale(0.7) translateY(-50px);
            opacity: 0;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes modalExit {
        0% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(0.7) translateY(50px);
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
    
    @keyframes soundPulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(styleSheet);

// =====================================
// EASTER EGG
// =====================================

let clickCount = 0;
const welcomeBadge = document.querySelector('.welcome-badge');

if (welcomeBadge) {
    welcomeBadge.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 3) {
            welcomeBadge.textContent = '🎉 ¡Easter Egg Encontrado!';
            welcomeBadge.style.animation = 'bounceIn 1s ease';
            
            // Cambiar colores del gradiente
            document.body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            
            showNotification('🎊 ¡Secreto Descubierto!', '¡Has desbloqueado el modo especial!');
            
            clickCount = 0;
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 2000);
    });
}

// =====================================
// INICIALIZACIÓN
// =====================================

console.log('%c🎯 Modal Moderno Cargado', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Características:', 'color: #38ef7d; font-size: 14px; font-weight: bold;');
console.log('  • 🎨 Diseño moderno con gradientes');
console.log('  • 🎬 Animaciones fluidas');
console.log('  • ⌨️ Control con teclado (ESC)');
console.log('  • 🖱️ Click outside to close');
console.log('  • 🔔 Sistema de notificaciones');
console.log('  • 🎉 Easter egg incluido');
console.log('%c💡 Tip: Haz 3 clicks en el badge de bienvenida', 'color: #f5576c; font-size: 12px;');

// Mensaje de bienvenida
setTimeout(() => {
    showNotification('👋 ¡Bienvenido!', 'Explora todas las funcionalidades del modal');
}, 1000);