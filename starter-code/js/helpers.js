export function stopDestinationsClicking(pointer, cursor) {
    document.querySelectorAll(".destination__places_place").forEach(element => {
        element.style.pointerEvents = pointer;
        element.style.cursor = cursor;
    });
}

// Choose image based on media queries

export  function DynamicImage() {

    const mobile_media_query = window.matchMedia("(max-width: 26.5em)");
    const tablet_media_query = window.matchMedia("(max-width: 64em)");

    if (mobile_media_query.matches || tablet_media_query.matches) {
        return "landscape" ;
    }
    else {
        return "portrait"
    }
}

// Hamburger Menu

export function HamburgerMenu() {
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
}