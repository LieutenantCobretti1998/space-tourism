import PageHandler from "./init.js";
import anime from "../../node_modules/animejs/lib/anime.es.js";
import {DynamicImage, HamburgerMenu, stopDestinationsClicking} from "./helpers.js";
// Main animation init

document.addEventListener("DOMContentLoaded", () => {
    const orientation = DynamicImage();
    const image_element = document.getElementById("dynamic-image");
    image_element.src = `assets/technology/image-launch-vehicle-${orientation}.jpg`;
    anime({
        targets: ".technologies_container__description__name, .technologies_container__description__text, .technologies_container__image img",
        keyframes: [
            { translateY: [75, 0], opacity: [0, 1] }
        ],
        duration: 2000,
        easing: "easeOutElastic(1, .8)"
    });

})


// Main Initialization of data fetching for technologies
const technologies_numbers_element = document.querySelector(".technologies_container__numbers");
technologies_numbers_element.addEventListener("click", async (e) => {

    document.querySelectorAll(".filled").forEach(element => {
        element.classList.remove("filled");
    })
    stopDestinationsClicking("none", "default", ".technologies_container__numbers__number");
    if(e.target.classList.contains("technologies_container__numbers__number")) {
        e.target.classList.add("filled");
        const number = Number(e.target.textContent) - 1;
        const pageHandler = new PageHandler("/data.json", "technologies");
        await pageHandler.initTechnologies(number);
    }
});


// Hamburger Menu
HamburgerMenu();
