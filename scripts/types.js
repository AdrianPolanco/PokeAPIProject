import { clearHTML } from "./general";

const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

export function showTypes(arrayTypes, container) {
    clearHTML(container);
    arrayTypes.forEach((element) => {
        const p = document.createElement("p");

        p.classList.add(
            "col-auto",
            "fs-3",
            "fw-bolder",
            "rounded-3",
            "p-1",
            "text-uppercase"
        );

        p.textContent = element;

        switch (element) {
            case "normal":
                p.style.backgroundColor = colours.normal;
                break;
            case "fire":
                p.style.backgroundColor = colours.fire;
                break;
            case "water":
                p.style.backgroundColor = colours.water;
                break;
            case "electric":
                p.style.backgroundColor = colours.electric;
                break;
            case "grass":
                p.style.backgroundColor = colours.grass;
                break;
            case "ice":
                p.style.backgroundColor = colours.ice;
                break;
            case "fighting":
                p.style.backgroundColor = colours.fighting;
                break;
            case "poison":
                p.style.backgroundColor = colours.poison;
                break;
            case "ground":
                p.style.backgroundColor = colours.ground;
                break;
            case "flying":
                p.style.backgroundColor = colours.flying;
                break;
            case "psychic":
                p.style.backgroundColor = colours.psychic;
                break;
            case "bug":
                p.style.backgroundColor = colours.bug;
                break;
            case "rock":
                p.style.backgroundColor = colours.rock;
                break;
            case "ghost":
                p.style.backgroundColor = colours.ghost;
                break;
            case "dragon":
                p.style.backgroundColor = colours.dragon;
                break;
            case "dark":
                p.style.backgroundColor = colours.dark;
                break;
            case "steel":
                p.style.backgroundColor = colours.steel;
                break;
            case "fairy":
                p.style.backgroundColor = colours.fairy;
                break;

            default:
                break;
        }

        container.appendChild(p);
    });
}

export function getWeaknesses(types = []) {
    const weaknesses = document.querySelector("#weaknesses");

    types.forEach((type) => {
        const url = `https://pokeapi.co/api/v2/type/${type}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const strongTypes = data["damage_relations"][
                    "double_damage_from"
                ].map((element) => element.name);

                showTypes(strongTypes, weaknesses);
            });
    });
}
