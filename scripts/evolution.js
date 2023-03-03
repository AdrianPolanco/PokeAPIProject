import { showTypes } from "./types";
import { clearHTML } from "./general";
const evolutionsContainer = document.querySelector("#evolutions-container");

/*
NOTA: Puedo acceder al pokemon-species del pokemon actual y desde ahí capturar el valor de su
evolution_chain para con eso hacerle un fetch al link de la API de evolution_chain, y en base a eso
hacer un HTML que mueste la cadena evolutiva en un orden FIJO
*/

export function requestEvolutionChain(url) {
    fetch(url)
        .then((request) => request.json())
        .then((data) => showEvolution(data));
}

function showEvolution(obj) {
    const { chain } = obj;

    fetch(chain["species"]["url"])
        .then((response) => response.json())
        .then((data) => buildCard(data));
}

function buildCard(obj) {
    let numberShown;
    const url = `https://pokeapi.co/api/v2/pokemon/${obj.name}`;
    const card = document.createElement("DIV");
    card.classList.add(
        "container",
        "col-3",
        "bg-dark-subtle",
        "rounded-4",
        "p-3",
        "row",
        "gap-5"
    );

    const secondaryDiv = document.createElement("DIV");
    secondaryDiv.classList.add(
        "row",
        "container",
        "text-light",
        "fs-4",
        "fw-bolder",
        "text-center"
    );
    const namePokemon = document.createElement("P");
    namePokemon.textContent = obj.name.toUpperCase();
    const numberPokemon = document.createElement("P");

    if (obj.id < 10) {
        numberShown = `#000${obj.id}`;
    } else if (obj.id >= 10 && obj.id < 100) {
        numberShown = `#00${obj.id}`;
    } else if (obj.id >= 100) {
        numberShown = `#0${obj.id}`;
    }

    numberPokemon.textContent = numberShown;

    const typesDiv = document.createElement("DIV");
    typesDiv.classList.add(
        "text-light",
        "row",
        "justify-content-center",
        "gap-2",
        "rounded-3",
        "fs-4",
        "fw-bold",
        "text-center",
        "m-auto"
    );

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            buildImage(data, card, typesDiv);
            secondaryDiv.appendChild(namePokemon);
            secondaryDiv.appendChild(numberPokemon);
            card.appendChild(secondaryDiv);
            card.appendChild(typesDiv);
        });

    clearHTML(evolutionsContainer);
    evolutionsContainer.appendChild(card);
}

function buildImage(pokemon, parent, secondDiv) {
    const img = document.createElement("IMG");
    img.src = pokemon.sprites.other["official-artwork"]["front_default"];
    img.classList.add("rounded-circle", "bg-light", "img-fluid");

    parent.appendChild(img);

    const newArrayEvolutionTypes = pokemon["types"].map(
        (typeIndex) => typeIndex.type.name
    );

    showTypes(newArrayEvolutionTypes, secondDiv);
}
