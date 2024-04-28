import TreeCreator from "./dom_creater.js";
import { DynamicImage } from "./helpers.js";

// First we will read our json file in the class DataFetcher

class DataFetcher {
    url
    constructor(json_url) {
        this.url = json_url;
    }
    
    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                console.error((`Error occurred: ${response.status}`));
            }

            return await response.json();
        }
        catch (e) {
            console.error(e);
        }
    }
}


export default class PageHandler extends DataFetcher {
    type_of_information
    constructor(url, type_of_information) {
        super(url);
        this.type_of_information = type_of_information;
    }
    
    async findDestination(data, destination) {
        for(const dest in data.destinations) {
            let name = data.destinations[dest].name;
            if (name === destination) {
                return data.destinations[dest];
            }
        }
    }
    
    async initDestination(destinationName) {
        try {
            const data = await this.fetchData();
            if (data) {
                const destination = await this.findDestination(data, destinationName)
                // Assuming destinations[4] might not exist, which will cause an error
                this.defaultDestination(destination);
            }
        } 
        catch (error) {
            console.error("Error in init method:", error.message);
            // Handle the error, e.g., show a message to the user
        }
    };

    async initTechnologies(technology_index) {
        try {
            const data = await this.fetchData();
            if (data && data.technology && data.technology[technology_index] !== undefined) {
                const technology = await data.technology[technology_index];
                this.defaultTechnology(technology, technology_index);
            }
            else {
                console.error("This technology doesn't exist or the index is not right");
            }
        }
        catch (e) {
            console.error(`something went wrong: ${e.message}`);
        }
    };

    async initCrew(crew_index) {
        try {
            const data = await this.fetchData();
            if(data && data.crew && data.crew[crew_index] !== undefined) {
                const crew = await data.crew[crew_index];
                this.defaultCrew(crew);
            }
        }
        catch (e) {
            console.error(`something went wrong: ${e.message}`);
        }
    }

    defaultTechnology(default_technology, index) {
        const orientation = DynamicImage()
        if (default_technology) {
            new TreeCreator({
                type: this.type_of_information,
                index: index,
                name: default_technology.name,
                image: default_technology.images[orientation],
                text: default_technology.description
            });
        }
    };

    defaultDestination(default_destination) {
        if (default_destination) {
            new TreeCreator({
                type: this.type_of_information,
                name: default_destination.name,
                image: default_destination.images.png,
                text: default_destination.description,
                distance: default_destination.distance,
                travel_time: default_destination.travel
            });
        } else {
            throw new Error("This object isn't existed");
        }
    };

    defaultCrew(default_crew) {
        if (default_crew) {
            new TreeCreator({
                type: this.type_of_information,
                name: default_crew.name,
                image:default_crew.images.png,
                text: default_crew.bio,
                role: default_crew.role
            })
        }
    }
}


