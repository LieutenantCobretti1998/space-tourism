import PageHandler from "./init.js";

// Main Initialization of data fetching for technologies
const technologies_numbers_element = document.querySelector(".technologies_container__numbers");
technologies_numbers_element.addEventListener("click", async (e) => {

    document.querySelectorAll(".filled").forEach(element => {
        element.classList.remove("filled");
    })
    
    const number = Number(e.target.textContent) - 1;
    const pageHandler = new PageHandler("./data.json", "technologies");
    await pageHandler.initTechnologies(number);
});