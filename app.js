import { endApp, startApp } from "./scripts/open.js";
import { cargarScroll } from "./scripts/scroll.js";
import {
    basicInfo,
    versionsObj,
    descriptionText,
} from "./scripts/basicInfo.js";

/*Relevant links:

https://pokeapi.co/api/v2/pokemon-species/7/

https://pokeapi.co/api/v2/evolution-chain/3/

https://pokeapi.co/api/v2/type/
*/

const startButton = document.querySelector("#startButton");
const versionsDiv = document.querySelector("#versions-div");
const exit = document.querySelector("#exit");

document.addEventListener("DOMContentLoaded", function (e) {
    cargarScroll();
    startButton.addEventListener("click", function (e) {
        startApp();
    });
});

//Changes the descriptions depending on the pokeball icon you clicked
versionsDiv.addEventListener("click", (e) => {
    if (e.target.id === "version-1") {
        descriptionText.textContent = versionsObj.sword;
    } else if (e.target.id === "version-2") {
        descriptionText.textContent = versionsObj.shield;
    }
});

exit.addEventListener("click", function (e) {
    endApp();
});
