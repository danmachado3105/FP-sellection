const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const container = document.querySelector(".container");
const list = container.querySelector(".list");

const items = container.querySelectorAll(".list .item");

const indicator = document.querySelector(".indicators");
const dots = indicator.querySelectorAll("ul li");
const number = indicator.querySelector(".number");

let active = 0;

const firstPosition = 0;
const lastPosition = items.length - 1;


/* =========================================
   ATUALIZA O SLIDER
========================================= */

function setSlider() {

    const oldItem = container.querySelector(".list .item.active");

    if (oldItem) {
        oldItem.classList.remove("active");
    }


    const oldDot = indicator.querySelector("ul li.active");

    if (oldDot) {
        oldDot.classList.remove("active");
    }


    dots[active].classList.add("active");

    number.textContent = `0${active + 1}`;
}


/* =========================================
   PRÓXIMO CARRO
========================================= */

function nextSlide() {

    list.style.setProperty("--calculation", "1");

    active = active + 1 > lastPosition
        ? firstPosition
        : active + 1;

    setSlider();

    items[active].classList.add("active");
}


/* =========================================
   CARRO ANTERIOR
========================================= */

function previousSlide() {

    list.style.setProperty("--calculation", "-1");

    active = active - 1 < firstPosition
        ? lastPosition
        : active - 1;

    setSlider();

    items[active].classList.add("active");
}


/* =========================================
   EVENTOS DOS BOTÕES
========================================= */

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);


/* =========================================
   TECLADO
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        previousSlide();
    }

});


/* =========================================
   SWIPE NO CELULAR
========================================= */

let touchStartX = 0;
let touchEndX = 0;

container.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });


container.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });


function handleSwipe() {

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance < 0) {
        nextSlide();
    } else {
        previousSlide();
    }
}