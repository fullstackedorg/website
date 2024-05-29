const nav = document.querySelector("nav");
const mobileMenuOpen = document.querySelector("#mobile-menu-open");
const mobileMenuClose = document.querySelector("#mobile-menu-close");

mobileMenuOpen.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.add("open");
});

mobileMenuClose.addEventListener("click", () => {
    nav.classList.remove("open");
});

window.addEventListener("click", () => {
    nav.classList.remove("open");
});
