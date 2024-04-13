import anime from "../../node_modules/animejs/lib/anime.es.js";
export default class TreeCreator {
    #destination_name
    #destination_image
    #destination_text
    #distance
    #travel_time
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
        this.index = options.index || 0;

        this.#destination_name_element = document.querySelector(".destination__name");
        this.#distance_element = document.querySelector(".destination__characteristics_distance strong");
        this.#destination_text_name_element = document.querySelector(".destination__text");
        this.#time_element =  document.querySelector(".destination__characteristics_travelTime strong");
        this.#image_element = document.querySelector(".destination__image img");

        if (options.type === "destinations") {
            this.updateDomTreeDestinations();
        } else if (options.type === "technologies") {
            this.updateDomTreeTechnologies();
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
    };

    updateDomTreeTechnologies() {

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

        document.querySelectorAll(".technologies_container__numbers__number").forEach(element => {
            let number = this.index + 1;
            if (number === Number(element.textContent)) {
                element.classList.add("filled");
            }
        });

    }
}

