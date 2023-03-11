import { showTypes } from "./types.js";
import { clearHTML } from "./general.js";
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
    clearHTML(evolutionsContainer);
    const { chain } = obj;
    const firstUrl = chain["species"]["url"];
    let secondUrl = 0;
    let thirdUrl = 0;

    if (chain["evolves_to"].length !== 0) {
        secondUrl = chain["evolves_to"][0].species.url;

        if (chain["evolves_to"][0]["evolves_to"].length !== 0) {
            thirdUrl = chain["evolves_to"][0]["evolves_to"][0].species.url;
        }
    }

    const urlArray = [firstUrl, secondUrl, thirdUrl];

    for (let i = 0; i < urlArray.length; i++) {
        if (urlArray[i] !== 0) {
            fetch(urlArray[i])
                .then((response) => response.json())
                .then((data) => buildCard(data, i));
        }
    }
}

function buildCard(obj, order) {
    let numberShown;
    const url = `https://pokeapi.co/api/v2/pokemon/${obj.id}`;
    const card = document.createElement("DIV");
    card.classList.add(
        "container",
        "col-3",
        "bg-dark-subtle",
        "rounded-4",
        "p-3",
        "row",
        "gap-5",
        `order-${order}`
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
