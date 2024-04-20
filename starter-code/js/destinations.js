import PageHandler from "./init.js";
import stopDestinationsClicking from "./helpers.js";

// Initial first loading animation
function InitialAnimation() {
    const image_element = document.querySelector(".destination__image img");
    image_element.style.animation = 'moveInRight 2s';

    const distance_element = document.querySelector(".destination__characteristics_distance strong");
    distance_element.style.animation = "movetoLeft 2s";

    const destination_name_element = document.querySelector(".destination__name");
    destination_name_element.style.animation = "movetoLeft 2s";

    const destination_text_name_element = document.querySelector(".destination__text");
    destination_text_name_element.style.animation = "movetoLeft 2s";

    const time_element =  document.querySelector(".destination__characteristics_travelTime strong");
    time_element.style.animation = "movetoLeft 2s";
}

document.addEventListener('DOMContentLoaded', () => {
    InitialAnimation();
});



// Main Initialization of data fetching for destinations
const nav_element = document.querySelector(".destination__places");
nav_element.addEventListener("click", async (e)=> {

    // Simple checking for already selected element
    if (e.target.classList.length === 0) {
        return
    }

    document.querySelectorAll(".active-destination").forEach(element => {
        element.classList.remove("active-destination");
    })

    stopDestinationsClicking("none", "default");

    if (e.target.classList.contains("destination__places_place")) {
        const destination_name = e.target.textContent.trim();
        const pageHandler = new PageHandler("./data.json", "destinations");
        await pageHandler.initDestination(destination_name);
    }

});