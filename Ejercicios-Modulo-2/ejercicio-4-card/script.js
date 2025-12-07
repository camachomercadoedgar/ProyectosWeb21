// =====================================
// CARD COMPONENT - FUNCIONALIDADES
// =====================================

// Estado de la aplicación
const appState = {
    cart: [],
    favorites: new Set(),
    cartCount: 0
};

// Datos de productos
const productsData = {
    1: {
        id: 1,
        name: "Auriculares Pro X",
        price: 199.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
        description: "Auriculares inalámbricos premium con cancelación de ruido activa y batería de hasta 30 horas. Diseño ergonómico y sonido envolvente.",
        specs: {
            "Batería": "30 horas",
            "Conectividad": "Bluetooth 5.0",
            "Cancelación": "ANC activa",
            "Peso": "250g"
        }
    },
    2: {
        id: 2,
        name: "Smartwatch Elite",
        price: 159.99,
        oldPrice: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
        description: "Reloj inteligente con monitoreo de salud 24/7, GPS integrado y resistencia al agua IP68. Pantalla AMOLED de alta resolución.",
        specs: {
            "Pantalla": "1.4\" AMOLED",
            "Batería": "7 días",
            "Resistencia": "IP68",
            "Sensores": "GPS + PPG"
        }
    },
    3: {
        id: 3,
        name: "Cámara Digital 4K",
        price: 899.99,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop",
        description: "Cámara profesional con sensor de 24MP, grabación 4K a 60fps y estabilización de imagen de 5 ejes. Ideal para fotógrafos profesionales.",
        specs: {
            "Sensor": "24MP Full Frame",
            "Video": "4K 60fps",
            "ISO": "100-51200",
            "Estabilización": "5 ejes"
        }
    }
};

// =====================================
// INICIALIZACIÓN
// =====================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadCartFromStorage();
    console.log('🛒 Sistema de carrito inicializado');
});

// =====================================
// EVENT LISTENERS
// =====================================

function initializeEventListeners() {
    // Botones de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Botones de ver detalles
    const detailButtons = document.querySelectorAll('.btn-details');
    detailButtons.forEach(button => {
        button.addEventListener('click', handleShowDetails);
    });

    // Botones de favoritos
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', handleToggleFavorite);
    });

    // Carrito flotante
    const cartFloating = document.getElementById('cartFloating');
    if (cartFloating) {
        cartFloating.addEventListener('click', handleShowCart);
    }

    // Modal
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// =====================================
// AÑADIR AL CARRITO
// =====================================

function handleAddToCart(e) {
    const button = e.currentTarget;
    const productName = button.getAttribute('data-product');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // Animación del botón
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);

    // Agregar al carrito
    addToCart({ name: productName, price: productPrice });

    // Mostrar notificación
    showNotification('success', '¡Agregado al carrito!', `${productName} ha sido añadido exitosamente`);

    // Animar el icono del carrito
    animateCartIcon();
}

function addToCart(product) {
    appState.cart.push(product);
    appState.cartCount++;
    updateCartCount();
    saveCartToStorage();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = appState.cartCount;
        
        // Animación del contador
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.animation = 'none';
        setTimeout(() => {
            cartIcon.style.animation = 'heartBeat 0.5s ease';
        }, 10);
    }
}

// =====================================
// VER DETALLES (MODAL)
// =====================================

function handleShowDetails(e) {
    const button = e.currentTarget;
    const productId = parseInt(button.getAttribute('data-product-id'));
    const product = productsData[productId];

    if (!product) return;

    // Crear contenido del modal
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-image">
        <h2 class="modal-title">${product.name}</h2>
        <div class="card-price">
            <span class="price-current">$${product.price}</span>
            ${product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : ''}
        </div>
        <p class="card-description">${product.description}</p>
        
        <h3 style="margin: 1.5rem 0 1rem; color: var(--color-text); font-size: 1.2rem;">📋 Especificaciones</h3>
        <div class="modal-specs">
            ${Object.entries(product.specs).map(([key, value]) => `
                <div class="spec-item">
                    <div class="spec-label">${key}</div>
                    <div class="spec-value">${value}</div>
                </div>
            `).join('')}
        </div>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <button class="btn-primary" style="flex: 1;" onclick="addToCartFromModal(${productId})">
                <span class="btn-icon-left">🛒</span>
                Añadir al Carrito
            </button>
        </div>
    `;

    // Mostrar modal
    openModal();
}

function openModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Función global para añadir desde el modal
window.addToCartFromModal = function(productId) {
    const product = productsData[productId];
    if (product) {
        addToCart({ name: product.name, price: product.price });
        showNotification('success', '¡Agregado al carrito!', `${product.name} ha sido añadido exitosamente`);
        animateCartIcon();
        closeModal();
    }
};

// =====================================
// FAVORITOS
// =====================================

function handleToggleFavorite(e) {
    const button = e.currentTarget;
    const card = button.closest('.card');
    const productId = card.getAttribute('data-product-id');

    if (appState.favorites.has(productId)) {
        // Remover de favoritos
        appState.favorites.delete(productId);
        button.classList.remove('active');
        showNotification('error', 'Removido de favoritos', 'El producto fue eliminado de tus favoritos');
    } else {
        // Agregar a favoritos
        appState.favorites.add(productId);
        button.classList.add('active');
        showNotification('success', '¡Agregado a favoritos!', 'El producto fue añadido a tus favoritos');
    }

    // Animar el botón
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'heartBeat 0.5s ease';
    }, 10);
}

// =====================================
// MOSTRAR CARRITO
// =====================================

function handleShowCart() {
    if (appState.cart.length === 0) {
        showNotification('error', 'Carrito vacío', 'No has agregado productos todavía');
        return;
    }

    const total = appState.cart.reduce((sum, item) => sum + item.price, 0);
    const itemsList = appState.cart.map((item, index) => 
        `<li>${index + 1}. ${item.name} - $${item.price.toFixed(2)}</li>`
    ).join('');

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2 class="modal-title">🛒 Tu Carrito</h2>
        <p style="color: var(--color-text-light); margin-bottom: 1.5rem;">
            Tienes ${appState.cartCount} ${appState.cartCount === 1 ? 'producto' : 'productos'} en tu carrito
        </p>
        
        <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
            ${itemsList}
        </ul>
        
        <div style="background: linear-gradient(145deg, #f7fafc, #edf2f7); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1.3rem; font-weight: 700; color: var(--color-text);">Total:</span>
                <span style="font-size: 2rem; font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    $${total.toFixed(2)}
                </span>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="btn-primary" style="flex: 1;" onclick="handleCheckout()">
                💳 Proceder al Pago
            </button>
            <button class="btn-secondary" onclick="handleClearCart()">
                🗑️ Vaciar Carrito
            </button>
        </div>
    `;

    openModal();
}

// Función global para checkout
window.handleCheckout = function() {
    showNotification('success', '¡Redirigiendo al pago!', 'Serás redirigido a la página de checkout');
    setTimeout(() => {
        closeModal();
    }, 2000);
};

// Función global para vaciar carrito
window.handleClearCart = function() {
    appState.cart = [];
    appState.cartCount = 0;
    updateCartCount();
    saveCartToStorage();
    closeModal();
    showNotification('success', 'Carrito vaciado', 'Todos los productos fueron removidos');
};

// =====================================
// NOTIFICACIONES
// =====================================

function showNotification(type, title, message) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? '✅' : '❌';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;

    container.appendChild(notification);

    // Auto-remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// =====================================
// ALMACENAMIENTO LOCAL
// =====================================

function saveCartToStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(appState.cart));
        localStorage.setItem('cartCount', appState.cartCount);
    } catch (e) {
        console.log('No se pudo guardar en localStorage');
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('cart');
        const savedCount = localStorage.getItem('cartCount');
        
        if (savedCart) {
            appState.cart = JSON.parse(savedCart);
        }
        if (savedCount) {
            appState.cartCount = parseInt(savedCount);
            updateCartCount();
        }
    } catch (e) {
        console.log('No se pudo cargar desde localStorage');
    }
}

// =====================================
// EFECTOS ADICIONALES
// =====================================

// Efecto parallax en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Efecto de hover en las cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Easter egg: Triple click en el título
let titleClickCount = 0;
const pageTitle = document.querySelector('.page-title');
if (pageTitle) {
    pageTitle.addEventListener('click', () => {
        titleClickCount++;
        if (titleClickCount === 3) {
            showNotification('success', '🎉 ¡Easter Egg!', '¡Has encontrado un secreto! Descuento del 50% en tu próxima compra');
            pageTitle.style.animation = 'bounceIn 1s ease';
            titleClickCount = 0;
            
            // Aplicar descuento visual
            document.querySelectorAll('.price-current').forEach(price => {
                const currentPrice = parseFloat(price.textContent.replace('$', ''));
                const discountedPrice = (currentPrice * 0.5).toFixed(2);
                price.innerHTML = `<span style="text-decoration: line-through; opacity: 0.5;">$${currentPrice}</span> $${discountedPrice}`;
            });
        }
        setTimeout(() => titleClickCount = 0, 2000);
    });
}

// Añadir animación de fadeOut al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// Log de bienvenida
console.log('%c🛍️ Card Component Store', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c✨ Características:', 'color: #38ef7d; font-size: 16px; font-weight: bold;');
console.log('  • 🛒 Sistema de carrito funcional');
console.log('  • ❤️ Sistema de favoritos');
console.log('  • 📱 Modal de detalles');
console.log('  • 🔔 Notificaciones en tiempo real');
console.log('  • 💾 Persistencia con localStorage');
console.log('%c🎮 Easter Egg: Haz triple click en el título', 'color: #f5576c; font-size: 14px;');