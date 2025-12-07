// =====================================
// BOX-SIZING DEMO INTERACTIVA
// =====================================

// Elementos del DOM
const widthSlider = document.getElementById('widthSlider');
const paddingSlider = document.getElementById('paddingSlider');
const borderSlider = document.getElementById('borderSlider');

const widthValue = document.getElementById('widthValue');
const paddingValue = document.getElementById('paddingValue');
const borderValue = document.getElementById('borderValue');

const demoContentBox = document.getElementById('demoContentBox');
const demoBorderBox = document.getElementById('demoBorderBox');

const totalContentBox = document.getElementById('totalContentBox');
const totalBorderBox = document.getElementById('totalBorderBox');

const resetBtn = document.getElementById('resetBtn');

// Valores iniciales
const initialValues = {
    width: 200,
    padding: 20,
    border: 10
};

// Función principal para actualizar las cajas
function updateBoxes() {
    const width = parseInt(widthSlider.value);
    const padding = parseInt(paddingSlider.value);
    const border = parseInt(borderSlider.value);
    
    // Actualizar valores mostrados con animación
    updateValueDisplay(widthValue, `${width}px`);
    updateValueDisplay(paddingValue, `${padding}px`);
    updateValueDisplay(borderValue, `${border}px`);
    
    // Aplicar estilos a ambas cajas
    const boxes = [demoContentBox, demoBorderBox];
    boxes.forEach(box => {
        box.style.width = `${width}px`;
        box.style.padding = `${padding}px`;
        box.style.borderWidth = `${border}px`;
    });
    
    // Calcular totales
    // content-box: width + (padding * 2) + (border * 2)
    const contentBoxTotal = width + (padding * 2) + (border * 2);
    
    // border-box: width (incluye padding y border)
    const borderBoxTotal = width;
    
    // Actualizar totales con animación
    animateTotal(totalContentBox, contentBoxTotal);
    animateTotal(totalBorderBox, borderBoxTotal);
    
    // Añadir clase de animación
    boxes.forEach(box => {
        box.classList.add('updating');
        setTimeout(() => box.classList.remove('updating'), 300);
    });
}

// Función para actualizar displays de valores con efecto
function updateValueDisplay(element, value) {
    element.style.transform = 'scale(1.1)';
    element.textContent = value;
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Función para animar el cambio de totales
function animateTotal(element, newValue) {
    const currentValue = parseInt(element.textContent.match(/\d+/)[0]);
    const difference = newValue - currentValue;
    const steps = 10;
    const stepValue = difference / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        const displayValue = Math.round(currentValue + (stepValue * currentStep));
        element.textContent = `Total: ${displayValue}px`;
        
        if (currentStep >= steps) {
            clearInterval(interval);
            element.textContent = `Total: ${newValue}px`;
        }
    }, 20);
}

// Función para resetear valores
function resetValues() {
    // Animar el botón
    resetBtn.style.transform = 'rotate(360deg) scale(0.9)';
    
    setTimeout(() => {
        // Resetear sliders
        widthSlider.value = initialValues.width;
        paddingSlider.value = initialValues.padding;
        borderSlider.value = initialValues.border;
        
        // Actualizar cajas
        updateBoxes();
        
        // Restaurar botón
        resetBtn.style.transform = 'rotate(0deg) scale(1)';
        
        // Mostrar mensaje de confirmación
        showNotification('✅ Valores reseteados');
    }, 300);
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
        z-index: 1000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
    `;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para añadir efectos de sonido visual
function addVisualFeedback(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Event listeners para los sliders
widthSlider.addEventListener('input', () => {
    updateBoxes();
    addVisualFeedback(widthSlider);
});

paddingSlider.addEventListener('input', () => {
    updateBoxes();
    addVisualFeedback(paddingSlider);
});

borderSlider.addEventListener('input', () => {
    updateBoxes();
    addVisualFeedback(borderSlider);
});

// Event listener para el botón de reset
resetBtn.addEventListener('click', resetValues);

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    // R para resetear
    if (e.key === 'r' || e.key === 'R') {
        resetValues();
    }
    
    // Flechas para ajustar width
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        widthSlider.value = Math.min(400, parseInt(widthSlider.value) + 10);
        updateBoxes();
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        widthSlider.value = Math.max(100, parseInt(widthSlider.value) - 10);
        updateBoxes();
    }
});

// Añadir estilos CSS para las animaciones dinámicas
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
    
    .updating {
        animation: pulse 0.3s ease;
    }
    
    input[type="range"] {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Inicializar al cargar la página
updateBoxes();

// Mensaje de bienvenida en consola
console.log('%c🎯 Box-Sizing Demo Cargada', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c🎮 Ajusta los sliders para ver la diferencia entre content-box y border-box', 'color: #38ef7d; font-size: 14px;');
console.log('%c⌨️ Atajos de teclado:', 'color: #f5576c; font-size: 14px; font-weight: bold;');
console.log('  • R = Resetear valores');
console.log('  • ↑/↓ = Ajustar width');

// Easter egg: doble click en el título
const title = document.querySelector('h1');
if (title) {
    let clickCount = 0;
    title.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            showNotification('🎉 ¡Has encontrado el easter egg!');
            title.style.animation = 'bounce 0.5s ease 3';
            clickCount = 0;
        }
        setTimeout(() => clickCount = 0, 1000);
    });
}