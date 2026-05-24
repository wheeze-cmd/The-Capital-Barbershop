
const track = document.querySelector('.service-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

nextBtn.addEventListener('click', () => {
    track.scrollBy({
        left: 350,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    track.scrollBy({
        left: -350,
        behavior: 'smooth'
    });
});

const navLinks = document.querySelectorAll("nav a");
const burger = document.getElementById("burger");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(() => {
            burger.checked = false;
        }, 100);
    });
});
