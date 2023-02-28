const nameInfo = document.querySelector("#name");
const numberInfo = document.querySelector("#pokedex-number");
export const descriptionText = document.querySelector("#description-text");

export let versionsObj = {
    sword: "",
    shield: "",
};

export function basicInfo(name, number) {
    const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}/`;
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
