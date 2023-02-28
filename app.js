import { startApp } from "./scripts/open.js";
import { cargarScroll } from "./scripts/scroll.js";

/*Relevant links:

https://pokeapi.co/api/v2/pokemon-species/7/

https://pokeapi.co/api/v2/evolution-chain/3/

https://pokeapi.co/api/v2/type/
*/

const startButton = document.querySelector("#startButton");

document.addEventListener("DOMContentLoaded", function (e) {
    cargarScroll();
    startButton.addEventListener("click", function (e) {
        startApp();
    });
});
