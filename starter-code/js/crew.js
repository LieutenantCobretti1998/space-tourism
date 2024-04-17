import PageHandler from "./init.js";
import anime from "../../node_modules/animejs/lib/anime.es.js";

// Main animation init

document.addEventListener("DOMContentLoaded", () => {
    anime({
        targets: ".crew_information__profession, .crew_information__text, .crew_information__name",
        keyframes: [
            { translateY: [75, 0], opacity: [0, 1] }
        ],
        duration: 2000,
        easing: "easeOutElastic(1, .8)"
    });
    anime({
        targets: ".crew-image",
        keyframes: [
            { translateY: [75, 70], opacity: [0, 1] }
        ],
        duration: 2000,
        easing: "easeOutElastic(1, .8)"
    })
})

const dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
    dot.addEventListener("click", async () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        if(dot.classList.contains('dot')) {
            const pageHandler = new PageHandler("./data.json", "crew");
            await pageHandler.initCrew(index);
            
        }
    })
})