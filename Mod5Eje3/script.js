// MENÚ HAMBURGUESA
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll(".nav-links a").forEach(link =>
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    })
);
