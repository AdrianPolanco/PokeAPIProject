import { endApp, startApp } from "./scripts/open.js";
import { cargarScroll } from "./scripts/scroll.js";
import {
    basicInfo,
    versionsObj,
    descriptionText,
    showDetails,
    changeName,
} from "./scripts/basicInfo.js";
import { searchInfo } from "./scripts/search.js";
import { showStats } from "./scripts/detailedInfo.js";

/*Relevant links:

https://pokeapi.co/api/v2/pokemon-species/7/

https://pokeapi.co/api/v2/evolution-chain/3/

https://pokeapi.co/api/v2/type/
*/

const startButton = document.querySelector("#startButton");
const versionSword = document.querySelector("#version-1");
const versionShield = document.querySelector("#version-2");
const exit = document.querySelector("#exit");
const buttonSearch = document.querySelector("#searchButton");

//Loads the scrolleable div with pokemon names
document.addEventListener("DOMContentLoaded", function (e) {
    cargarScroll();
    //Starts the app when you click the button OPEN
    startButton.addEventListener("click", function (e) {
        startApp();
    });

    const urlDefault = `https://pokeapi.co/api/v2/pokemon/1/`;

    fetch(urlDefault)
        .then((response) => response.json())
        .then((data) => {
            showDetails(data);
            showStats(data.stats);
            changeName("BULBASAUR", "#0001");
        });

    versionSword.classList.add("blue-active");
});

//Changes the descriptions depending on the pokeball icon you clicked
versionSword.addEventListener("click", (e) => {
    descriptionText.textContent = versionsObj.sword;
    versionSword.classList.add("blue-active");
    versionShield.classList.remove("red-active");
});

versionShield.addEventListener("click", (e) => {
    descriptionText.textContent = versionsObj.shield;
    versionShield.classList.add("red-active");
    versionSword.classList.remove("blue-active");
});

//Executes the function to get the pokemon by the search by
buttonSearch.addEventListener("click", function (e) {
    e.preventDefault();
    searchInfo();
});

//Goes back to the start menu
exit.addEventListener("click", function (e) {
    endApp();
});
