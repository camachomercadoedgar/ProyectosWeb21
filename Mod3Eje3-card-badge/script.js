// =====================================
// CARDS CON BADGES - JAVASCRIPT
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
        name: "Auriculares Pro Max",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
        description: "Cancelación de ruido activa y sonido de alta fidelidad para una experiencia inmersiva. Con 30 horas de batería y carga rápida.",
        specs: {
            "Batería": "30 horas",
            "Conexión": "Bluetooth 5.0",
            "Cancelación": "ANC activa",
            "Peso": "250g"
        }
    },
    2: {
        id: 2,
        name: "Reloj Smartwatch",
        price: 199.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
        description: "Seguimiento de actividad 24/7 con diseño elegante y duración de batería de 7 días. Resistente al agua.",
        specs: {
            "Pantalla": "AMOLED",
            "Batería": "7 días",
            "Resistencia": "IP68",
            "GPS": "Integrado"
        }
    },
    3: {
        id: 3,
        name: "Gafas de Sol Premium",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop",
        description: "Protección UV400 con diseño moderno y materiales de primera calidad. Marco de titanio ultra ligero.",
        specs: {
            "Protección": "UV400",
            "Material": "Titanio",
            "Polarizadas": "Sí",
            "Peso": "25g"
        }
    },
    4: {
        id: 4,
        name: "Zapatillas Running Pro",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop",
        description: "Máximo confort y rendimiento para tus entrenamientos más exigentes. Tecnología de amortiguación avanzada.",
        specs: {
            "Tipo": "Running",
            "Amortiguación": "Máxima",
            "Drop": "8mm",
            "Peso": "280g"
        }
    },
    5: {
        id: 5,
        name: "Mochila Profesional",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
        description: "Compartimento acolchado para laptop y diseño ergonómico anti-robo. Resistente al agua.",
        specs: {
            "Capacidad": "25L",
            "Laptop": "Hasta 15.6\"",
            "Material": "Nylon balístico",
            "Puerto USB": "Sí"
        }
    },
    6: {
        id: 6,
        name: "Fragancia Signature",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=600&fit=crop",
        description: "Esencia única que combina notas frescas y amaderadas para ocasiones especiales. Larga duración.",
        specs: {
            "Volumen": "100ml",
            "Notas": "Floral/Amaderado",
            "Duración": "8-12 horas",
            "Ocasión": "Todo uso"
        }
    }
};

// =====================================
// INICIALIZACIÓN
// =====================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadCartFromStorage();
    showWelcomeMessage();
    console.log('🛒 Sistema de tienda inicializado');
});

// =====================================
// EVENT LISTENERS
// =====================================

function initializeEventListeners() {
    // Botones añadir al carrito
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    // Botones de detalles
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', handleShowDetails);
    });

    // Botones favoritos
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', handleToggleFavorite);
    });

    // Botones vista rápida
    document.querySelectorAll('.btn-quick-view').forEach(btn => {
        btn.addEventListener('click', handleQuickView);
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// =====================================
// AÑADIR AL CARRITO
// =====================================

function handleAddToCart(e) {
    const button = e.currentTarget;
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productId = button.getAttribute('data-id');

    // Animación del botón
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);

    // Agregar al carrito
    addToCart({ id: productId, name: productName, price: productPrice });

    // Mostrar notificación
    showToast('success', '¡Agregado al carrito!', `${productName} ha sido añadido exitosamente`);

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
// VER DETALLES
// =====================================

function handleShowDetails(e) {
    const button = e.currentTarget;
    const productId = button.getAttribute('data-id');
    const product = productsData[productId];

    if (!product) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 16px; margin-bottom: 1.5rem;">
        <h2 style="font-size: 2rem; font-weight: 800; color: #2d3748; margin-bottom: 1rem;">${product.name}</h2>
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <span style="font-size: 2rem; font-weight: 900; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$${product.price}</span>
            ${product.oldPrice ? `<span style="font-size: 1.2rem; color: #cbd5e0; text-decoration: line-through;">$${product.oldPrice}</span>` : ''}
        </div>
        <p style="color: #718096; line-height: 1.8; margin-bottom: 2rem;">${product.description}</p>
        
        <h3 style="color: #2d3748; font-size: 1.3rem; margin-bottom: 1rem;">📋 Especificaciones</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            ${Object.entries(product.specs).map(([key, value]) => `
                <div style="background: linear-gradient(145deg, #f7fafc, #edf2f7); padding: 1rem; border-radius: 12px; text-align: center;">
                    <div style="font-size: 0.85rem; color: #718096; margin-bottom: 0.25rem;">${key}</div>
                    <div style="font-weight: 700; color: #2d3748;">${value}</div>
                </div>
            `).join('')}
        </div>
        
        <button onclick="addToCartFromModal(${productId})" style="width: 100%; padding: 1.2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
            🛒 Añadir al Carrito
        </button>
    `;

    openModal();
}

// =====================================
// VISTA RÁPIDA
// =====================================

function handleQuickView(e) {
    const button = e.currentTarget;
    const productId = button.getAttribute('data-id');
    handleShowDetails({ currentTarget: { getAttribute: () => productId } });
}

function openModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addToCartFromModal = function(productId) {
    const product = productsData[productId];
    if (product) {
        addToCart({ id: product.id, name: product.name, price: product.price });
        showToast('success', '¡Agregado!', `${product.name} añadido al carrito`);
        animateCartIcon();
        closeModal();
    }
};

// =====================================
// FAVORITOS
// =====================================

function handleToggleFavorite(e) {
    const button = e.currentTarget;
    const productId = button.getAttribute('data-id');

    if (appState.favorites.has(productId)) {
        appState.favorites.delete(productId);
        button.classList.remove('active');
        showToast('info', 'Removido', 'Producto eliminado de favoritos');
    } else {
        appState.favorites.add(productId);
        button.classList.add('active');
        showToast('success', '¡Favorito!', 'Producto añadido a favoritos ❤️');
    }

    button.style.animation = 'heartBeat 0.5s ease';
}

// =====================================
// MOSTRAR CARRITO
// =====================================

function handleShowCart() {
    if (appState.cart.length === 0) {
        showToast('info', 'Carrito vacío', 'No has agregado productos todavía');
        return;
    }

    const total = appState.cart.reduce((sum, item) => sum + item.price, 0);
    const itemsList = appState.cart.map((item, index) => 
        `<li style="padding: 0.75rem 0; border-bottom: 1px solid #e2e8f0;">${index + 1}. ${item.name} - $${item.price.toFixed(2)}</li>`
    ).join('');

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2 style="font-size: 2rem; font-weight: 800; color: #2d3748; margin-bottom: 1rem;">🛒 Tu Carrito</h2>
        <p style="color: #718096; margin-bottom: 1.5rem;">
            Tienes ${appState.cartCount} ${appState.cartCount === 1 ? 'producto' : 'productos'} en tu carrito
        </p>
        
        <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
            ${itemsList}
        </ul>
        
        <div style="background: linear-gradient(145deg, #f7fafc, #edf2f7); padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1.5rem; font-weight: 700; color: #2d3748;">Total:</span>
                <span style="font-size: 2.5rem; font-weight: 900; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    $${total.toFixed(2)}
                </span>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem;">
            <button onclick="handleCheckout()" style="flex: 1; padding: 1.2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                💳 Proceder al Pago
            </button>
            <button onclick="handleClearCart()" style="flex: 1; padding: 1.2rem; background: transparent; color: #f5576c; border: 2px solid #f5576c; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer;">
                🗑️ Vaciar Carrito
            </button>
        </div>
    `;

    openModal();
}

window.handleCheckout = function() {
    showToast('success', '¡Redirigiendo!', 'Serás llevado al pago en unos segundos...');
    setTimeout(() => {
        closeModal();
        showToast('success', '🎉 ¡Gracias!', 'Tu pedido ha sido procesado');
    }, 2000);
};

window.handleClearCart = function() {
    appState.cart = [];
    appState.cartCount = 0;
    updateCartCount();
    saveCartToStorage();
    closeModal();
    showToast('success', 'Carrito vaciado', 'Todos los productos fueron removidos');
};

// =====================================
// NOTIFICACIONES
// =====================================

function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// =====================================
// ALMACENAMIENTO
// =====================================

function saveCartToStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(appState.cart));
        localStorage.setItem('cartCount', appState.cartCount);
    } catch (e) {
        console.log('Storage no disponible');
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('cart');
        const savedCount = localStorage.getItem('cartCount');
        
        if (savedCart) appState.cart = JSON.parse(savedCart);
        if (savedCount) {
            appState.cartCount = parseInt(savedCount);
            updateCartCount();
        }
    } catch (e) {
        console.log('No se pudo cargar el carrito');
    }
}

// =====================================
// MENSAJE DE BIENVENIDA
// =====================================

function showWelcomeMessage() {
    setTimeout(() => {
        showToast('success', '👋 ¡Bienvenido!', 'Explora nuestra colección exclusiva de productos premium');
    }, 1000);
}

// =====================================
// EFECTOS ADICIONALES
// =====================================

// Animación de entrada en scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// Añadir animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Log de bienvenida
console.log('%c🛒 E-Commerce Moderno Cargado', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Características:', 'color: #38ef7d; font-size: 14px; font-weight: bold;');
console.log('  • 🛒 Sistema de carrito completo');
console.log('  • ❤️ Sistema de favoritos');
console.log('  • 👁️ Vista rápida de productos');
console.log('  • 📱 Modal de detalles');
console.log('  • 🔔 Notificaciones toast');
console.log('  • 💾 Persistencia con localStorage');
console.log('  • 🎨 Badges posicionados con position: absolute');