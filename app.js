import { startApp } from "./scripts/open.js";

/*Relevant links:

https://pokeapi.co/api/v2/pokemon-species/7/

https://pokeapi.co/api/v2/evolution-chain/3/
*/

const startButton = document.querySelector("#startButton");

document.addEventListener("DOMContentLoaded", function (e) {
    startButton.addEventListener("click", function (e) {
        startApp();
    });
});
