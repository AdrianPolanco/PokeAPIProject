import { clearHTML } from "./general.js";
import { showStats } from "./detailedInfo.js";

const nameInfo = document.querySelector("#name");
const numberInfo = document.querySelector("#pokedex-number");
const mainImage = document.querySelector("#mainImage");
const abilitiesData = document.querySelector("#abilities");
const heightData = document.querySelector("#heightData");
const weightData = document.querySelector("#weightData");
const categoryData = document.querySelector("#categoryData");
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
        .then((data) => {
            showDetails(data);
            showStats(data.stats);
        });

    fetch(urlSpecies)
        .then((answer) => answer.json())
        .then((data) => {
            successBasicInfo(name, number, data["flavor_text_entries"], data);
        });
}

function successBasicInfo(name, number, description = [], obj) {
    nameInfo.textContent = name;
    numberInfo.textContent = number;

    const identifiedType = obj["genera"].findIndex((info) => {
        return info.language.name === "en";
    });

    const identifiedInfoShield = description.findIndex((info) => {
        return info.language.name === "en" && info.version.name === "pearl";
    });
    const identifiedInfoSword = description.findIndex((info) => {
        return info.language.name === "en" && info.version.name === "diamond";
    });
    const categoryShown = obj["genera"][identifiedType].genus.slice(0, -8);
    categoryData.textContent = categoryShown;
    descriptionText.textContent =
        description[identifiedInfoSword]["flavor_text"];
    //categoryData.textContent =

    versionsObj.sword = description[identifiedInfoSword]["flavor_text"];
    versionsObj.shield = description[identifiedInfoShield]["flavor_text"];
}

/*  foto.src = obj.sprites.other["official-artwork"].front_default

  height.textContent = `Altura: ${obj.height}
  
  https://pokeapi.co/api/v2/pokemon/squirtle*/

export function showDetails(obj) {
    const { height, weight } = obj;

    const heightShown = (height / 10 / 0.3048).toFixed(2);
    const weightShown = (weight / 10 / 0.4535).toFixed(2);

    mainImage.src = obj.sprites.other["official-artwork"]["front_default"];
    heightData.textContent = `${heightShown}'`;
    weightData.textContent = `${weightShown} lbs`;
    clearHTML(abilitiesData);
    obj["abilities"].forEach((ability) => {
        const abilityData = document.createElement("p");
        abilityData.classList.add("fs-4", "fw-normal");
        abilityData.textContent = `${ability[
            "ability"
        ].name[0].toUpperCase()}${ability["ability"].name.slice(1)}`;

        abilitiesData.appendChild(abilityData);

        /*
        Datos que da la API:
        WeightAPI: 950 KILOS
        HeightAPI: 19 METROS

        Formula de los datos que realmente mostraremos:

        Weight parcial = WeightAPI KILOS / 10
        Weight final = Weight parcial KILOS / 0.4535 libras

        const API = 950;
        const corrected = API / 10;
        const final = (corrected / 0.4535).toFixed(2);
        console.log(final);

        Height parcial = HeightAPI METROS/ 10 
        Height final = Height parcial METROS / 0.3048 PIES

         const API = 19;
        const corrected = API / 10;
        const final = (corrected / 0.3048).toFixed(2);
        console.log(final + "'");

        
        */
    });
    //abilitiesData.textContent =
}
