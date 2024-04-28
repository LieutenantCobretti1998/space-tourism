import anime from "../../node_modules/animejs/lib/anime.es.js";
import { stopDestinationsClicking } from "./helpers.js";
export default class TreeCreator {
    #destination_name
    #destination_image
    #destination_text
    #distance
    #travel_time
    #index
    #role
    #destination_name_element
    #distance_element
    #destination_text_name_element
    #time_element
    #image_element
    #technologies_name_element
    #technologies_image_element
    #technologies_text_element
    constructor(options = {}) {
        this.#destination_name = options.name || '';
        this.#destination_image = options.image || '';
        this.#destination_text = options.text || '';
        this.#distance = options.distance || '';
        this.#travel_time = options.travel_time || '';
        this.#index = options.index || 0;
        this.#role = options.role || '';

        this.#destination_name_element = document.querySelector(".destination__name");
        this.#distance_element = document.querySelector(".destination__characteristics_distance strong");
        this.#destination_text_name_element = document.querySelector(".destination__text");
        this.#time_element =  document.querySelector(".destination__characteristics_travelTime strong");
        this.#image_element = document.querySelector(".destination__image img");

        switch (options.type) {
            case "destinations":
                this.updateDomTreeDestinations();
                break;
            case "technologies":
                this.updateDomTreeTechnologies();
                break;
            case "crew":
                this.updateDomTreeCrew();
                break;
        }
    }

    updateDomTreeDestinations() {
        
        // create the size of the underline and choose proper destination name
        document.querySelectorAll(".destination__places_place").forEach(element => {
            let name = element.textContent;
            if (name === this.#destination_name) {
                element.classList.add("active-destination");
            }
        });

        const destination_active_underline_element = document.querySelector(".active-destination");
        if (this.#destination_name.length > 5) {
            destination_active_underline_element.style.setProperty("--underline-width", "6rem");
        }
        else {
            destination_active_underline_element.style.setProperty("--underline-width", "4.8rem")
        }



        // update image
        this.removeElements(() => {
            this.#image_element.src = this.#destination_image;
            this.#image_element.alt = this.#destination_name;

            this.#distance_element.textContent = this.#distance;
            this.#destination_name_element.textContent = this.#destination_name;
            this.#time_element.textContent = this.#travel_time;
            this.#destination_text_name_element.textContent = this.#destination_text;

            // Update image in animation
            this.#image_element.style.animation = 'moveInRight 2s';

            // update distance
            this.#distance_element.style.animation = "movetoLeft 2s";

            // update destination name
            this.#destination_name_element.style.animation = "movetoLeft 2s";

            this.#time_element.style.animation = "movetoLeft 2s";

            this.#destination_text_name_element.style.animation = "movetoLeft 2s";
        })
        
    }

    removeElements(callback) {
        const handle_animation_end = () => {
            this.#image_element.removeEventListener("animationend", handle_animation_end);
            this.#distance_element.removeEventListener("animationend", handle_animation_end);
            this.#destination_name_element.removeEventListener("animationend", handle_animation_end);
            this.#time_element.removeEventListener("animationend", handle_animation_end);
            this.#destination_text_name_element.removeEventListener("animationend", handle_animation_end);
            if (callback && typeof callback === 'function') {
                callback(); // Execute the callback function after the animation ends
            }
        }

        // Start the moveOutLeft animation
        this.#image_element.style.animation = "moveOutLeft 2s";
        this.#distance_element.style.animation = "movetoRight 2s";
        this.#destination_name_element.style.animation = "movetoRight 2s";
        this.#time_element.style.animation = "movetoRight 2s";
        this.#destination_text_name_element.style.animation = "movetoRight 2s";

        // Add the event listener for animation end
        this.#image_element.addEventListener('animationend', handle_animation_end);
        this.#distance_element.addEventListener("animationend", handle_animation_end);
        this.#destination_name_element.addEventListener("animationend", handle_animation_end);
        this.#time_element.addEventListener("animationend", handle_animation_end);
        this.#destination_text_name_element.addEventListener("animationend", handle_animation_end);
        setTimeout(() => {
            stopDestinationsClicking("", "pointer", ".destination__places_place");
        }, 3500);
    };

    updateDomTreeTechnologies() {
        const newImage = new Image();
        newImage.onload = () => {
            anime({
                targets: ".technologies_container__description__name, .technologies_container__description__text, .technologies_container__image img",
                keyframes: [
                    { translateY: -75, opacity: [1, 0] }
                ],
                duration: 2000,
                easing: "easeOutElastic(1, .8)",
                complete: () => {
                    console.log(this.#destination_name);
                    this.#technologies_name_element = document.querySelector(".technologies_container__description__name");
                    this.#technologies_name_element.textContent = this.#destination_name;

                    this.#technologies_image_element = document.querySelector(".technologies_container__image img");
                    this.#technologies_image_element.src = this.#destination_image;
                    this.#technologies_image_element.alt = this.#destination_name;

                    this.#technologies_text_element = document.querySelector(".technologies_container__description__text");
                    this.#technologies_text_element.textContent = this.#destination_text;
                    setTimeout(() => {
                        stopDestinationsClicking("", "pointer", ".technologies_container__numbers__number");
                    }, 1000);
                    // Ensure elements are ready for the next animation
                    anime({
                        targets: ".technologies_container__description__name, .technologies_container__description__text, .technologies_container__image img",
                        keyframes: [
                            { translateY: [75, 0], opacity: [0, 1] }
                        ],
                        duration: 2000,
                        easing: "easeOutElastic(1, .8)"
                    });
                }
            });
        }
        newImage.src = this.#destination_image;
        document.querySelectorAll(".technologies_container__numbers__number").forEach(element => {
            let number = this.index + 1;
            if (number === Number(element.textContent)) {
                element.classList.add("filled");
            }
        });
    }

    updateDomTreeCrew() {
        // First, prepare the new image and define what to do when it loads
        const newImage = new Image();
        newImage.onload = () => {
            // The new image is now loaded and ready to be displayed
            // Begin the animation to fade out current content
            anime({
                targets: ".crew_information__profession, .crew_information__text, .crew_information__name, .crew-image",
                keyframes: [
                    { translateY: -75, opacity: [1, 0] }
                ],
                duration: 2000,
                easing: "easeOutElastic(1, .8)",
                complete: () => {
                    // Now that the content is faded out, update text contents
                    const profession_element = document.querySelector(".crew_information__profession");
                    profession_element.textContent = this.#role;

                    const crew_name_element = document.querySelector(".crew_information__name");
                    crew_name_element.textContent = this.#destination_name;

                    const description_element = document.querySelector(".crew_information__text");
                    description_element.textContent = this.#destination_text;

                    // Update the image with the new image that has been preloaded
                    const image_element = document.querySelector(".crew-image");
                    image_element.src = newImage.src; // Use the preloaded image's src
                    image_element.alt = this.#destination_name;

                    setTimeout(() => {
                        stopDestinationsClicking("", "pointer", ".dot");
                    }, 1000);

                    anime({
                        targets: ".crew_information__profession, .crew_information__text, .crew_information__name",
                        keyframes: [
                            { translateY: [75, -10], opacity: [0, 1] }
                        ],
                        duration: 2000,
                        easing: "easeOutElastic(1, .8)"
                    });

                    anime({
                        targets: ".crew-image",
                        keyframes: [
                            { translateY: [75, -10], opacity: [0, 1] }
                        ],
                        duration: 2000,
                        easing: "easeOutElastic(1, .8)"
                    })
                }
            });
        };
        // Set the src of the new image, which will start loading it
        newImage.src = this.#destination_image;
    }
}

