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
const versionSword = document.querySelector("#version-1");
const versionShield = document.querySelector("#version-2");
const exit = document.querySelector("#exit");

document.addEventListener("DOMContentLoaded", function (e) {
    cargarScroll();
    startButton.addEventListener("click", function (e) {
        startApp();
    });
});

//Changes the descriptions depending on the pokeball icon you clicked
versionSword.addEventListener("click", (e) => {
    descriptionText.textContent = versionsObj.sword;
});

versionShield.addEventListener("click", (e) => {
    descriptionText.textContent = versionsObj.shield;
});

exit.addEventListener("click", function (e) {
    endApp();
});
