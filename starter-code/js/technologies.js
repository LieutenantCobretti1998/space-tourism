import PageHandler from "./init.js";
import anime from "../../node_modules/animejs/lib/anime.es.js";
import { DynamicImage } from "./helpers.js";
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

    if(e.target.classList.contains("technologies_container__numbers__number")) {
        e.target.classList.add("filled");
        const number = Number(e.target.textContent) - 1;
        const pageHandler = new PageHandler("./data.json", "technologies");
        await pageHandler.initTechnologies(number);
    }
});


// Hamburger Menu
const close_button_element = document.querySelector(".close_button");
close_button_element.addEventListener("click", () => {
    console.log(1)
    const menu_overlay_element = document.querySelector(".menu-overlay");
    menu_overlay_element.classList.add("closing_menu");
    menu_overlay_element.addEventListener('animationend', () => {
        // Hide after animation completes
        menu_overlay_element.classList.remove("active_menu");
        menu_overlay_element.classList.remove('closing_menu'); // Clean up class to prepare for next open
    }, { once: true });
})

const open_button_element = document.querySelector(".open_menu");
open_button_element.addEventListener("click", () => {
    const menu_overlay_element = document.querySelector(".menu-overlay");
    menu_overlay_element.classList.remove("closing_menu");
    menu_overlay_element.classList.add("active_menu");
})
