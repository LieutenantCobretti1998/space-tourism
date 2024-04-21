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