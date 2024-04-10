import TreeCreator from "./dom_creater.js";

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


// First we will read our json file in the class DataFetcher

class DataFetcher {
    url
    constructor(json_url) {
        this.url = json_url;
        console.log(this.fetchData())
    }
    
    async fetchData() {
        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                throw new Error(`Error occurred: ${response.status}`);
            }
            
            return await response.json();
        }
        catch (e) {
            console.error(e)
        }
    }
}


class PageHandler extends DataFetcher {
    constructor(url) {
        super(url);
    }
    
    async findDestination(data, destination) {
        for(const dest in data.destinations) {
            console.log(dest)
            let name = data.destinations[dest].name;
            if (name === destination) {
                return data.destinations[dest];
            }
        }
    }
    
    async init(destinationName) {
        try {
            const data = await this.fetchData();
            if (data) {
                const destination = await this.findDestination(data, destinationName)
                console.log(destination);
                // Assuming destinations[4] might not exist, which will cause an error
                this.defaultDestination(destination);
            }
        } 
        catch (error) {
            console.error("Error in init method:", error.message);
            // Handle the error, e.g., show a message to the user
        }
    }

    defaultDestination(default_destination) {
        if (default_destination) {
            new TreeCreator(
                default_destination.name,
                default_destination.images.png,
                default_destination.description,
                default_destination.distance,
                default_destination.travel
                )
        } 
        else  {
            throw new Error("This object isn't existed")
        }
    }
    
}


// Main Initialization of data fetching
const nav_element = document.querySelector(".destination__places");
nav_element.addEventListener("click", async (e)=> {
    
    // Simple checking for already selected element
    if (e.target.classList.length === 0) {
        return
    }

    document.querySelectorAll(".active-destination").forEach(element => {
        element.classList.remove("active-destination");
    })
    
     if (e.target.classList.contains("destination__places_place")) {
         const destination_name = e.target.textContent.trim();
         const pageHandler = new PageHandler("./data.json");
         await pageHandler.init(destination_name);
     }

})

