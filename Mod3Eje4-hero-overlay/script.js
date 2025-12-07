// Comportamiento JS para la página Hero (toasts, contadores y scroll suave)
document.addEventListener('DOMContentLoaded', function () {
    const toastContainer = document.getElementById('toastContainer');
    const btnStart = document.getElementById('btnStart');
    const btnDemo = document.getElementById('btnDemo');
    const btnContact = document.getElementById('btnContact');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const contentSection = document.getElementById('contentSection');

    function showToast(title, message, type = 'success') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">${type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : '⚠️'}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
        if (type === 'success') toast.style.borderLeftColor = '#38ef7d';
        else if (type === 'info') toast.style.borderLeftColor = '#4facfe';
        else toast.style.borderLeftColor = '#f093fb';

        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s, transform 0.3s';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 350);
        }, 4500);
    }

    if (btnStart) btnStart.addEventListener('click', () => showToast('¡Comenzando!', 'Te llevaremos al proceso de inicio.', 'success'));
    if (btnDemo) btnDemo.addEventListener('click', () => showToast('Demo', 'Reproduciendo la demo interactiva...', 'info'));
    if (btnContact) btnContact.addEventListener('click', () => {
        showToast('Contacto', 'Abriendo formulario de contacto...', 'info');
        if (contentSection) contentSection.scrollIntoView({ behavior: 'smooth' });
    });
    if (scrollIndicator && contentSection) scrollIndicator.addEventListener('click', () => contentSection.scrollIntoView({ behavior: 'smooth' }));

    // Animar contadores cuando entren en pantalla
    const stats = document.querySelectorAll('.stat');
    if (stats && stats.length) {
        const animateStat = (el) => {
            const target = parseInt(el.getAttribute('data-count') || '0', 10);
            const numberEl = el.querySelector('.stat-number');
            if (!numberEl) return;
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const value = Math.floor(progress * target);
                numberEl.textContent = value.toString();
                if (progress < 1) requestAnimationFrame(step);
                else numberEl.textContent = target.toString();
            };
            requestAnimationFrame(step);
        };

        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStat(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        stats.forEach(s => io.observe(s));
    }

    // Evitar navegación por defecto en enlaces sociales (ejemplo)
    document.querySelectorAll('.social-link').forEach(a => a.addEventListener('click', (e) => e.preventDefault()));

    console.log('🚀 script.js cargado y corregido');
});