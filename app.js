import { startApp } from "./scripts/open.js";

const startButton = document.querySelector("#startButton");

document.addEventListener("DOMContentLoaded", function (e) {
    startButton.addEventListener("click", function (e) {
        startApp();
    });
});
