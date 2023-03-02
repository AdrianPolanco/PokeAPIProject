import { clearHTML } from "./general.js";

const nameInfo = document.querySelector("#name");
const numberInfo = document.querySelector("#pokedex-number");
const mainImage = document.querySelector("#mainImage");
const abilitiesData = document.querySelector("#abilities");
export const descriptionText = document.querySelector("#description-text");

export let versionsObj = {
    sword: "",
    shield: "",
};

export function basicInfo(name, number) {
    const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}/`;
    const urlDetails = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    fetch(urlDetails)
        .then((response) => response.json())
        .then((data) => showDetails(data));

    fetch(urlSpecies)
        .then((answer) => answer.json())
        .then((data) =>
            successBasicInfo(name, number, data["flavor_text_entries"])
        );
}

function successBasicInfo(name, number, description = []) {
    nameInfo.textContent = name;
    numberInfo.textContent = number;

    const identifiedInfoShield = description.findIndex((info) => {
        return info.language.name === "en" && info.version.name === "shield";
    });
    const identifiedInfoSword = description.findIndex((info) => {
        return info.language.name === "en" && info.version.name === "sword";
    });

    descriptionText.textContent = description[identifiedInfoSword].flavor_text;

    versionsObj.sword = description[identifiedInfoSword].flavor_text;
    versionsObj.shield = description[identifiedInfoShield].flavor_text;
}

/*  foto.src = obj.sprites.other["official-artwork"].front_default

  height.textContent = `Altura: ${obj.height}
  
  https://pokeapi.co/api/v2/pokemon/squirtle*/

export function showDetails(obj) {
    mainImage.src = obj.sprites.other["official-artwork"]["front_default"];
    clearHTML(abilitiesData);
    obj["abilities"].forEach((ability) => {
        const abilityData = document.createElement("p");
        abilityData.classList.add("fs-4", "fw-normal");
        abilityData.textContent = `${ability[
            "ability"
        ].name[0].toUpperCase()}${ability["ability"].name.slice(1)}`;

        abilitiesData.appendChild(abilityData);

        /*<p class="fs-4 fw-normal">Pressure</p>*/

        /*let string = "Hola";
        console.log(`${string[0]}${string.slice(1)}`);*/
    });
    //abilitiesData.textContent =
}
