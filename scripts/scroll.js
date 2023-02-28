const scrollList = document.querySelector("#scroll-list");
const scrollUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=493";

export function cargarScroll() {
    fetch(scrollUrl)
        .then((respuesta) => respuesta.json())
        .then((datos) => crearDivs(datos.results));
}

function crearDivs(datos = []) {
    /* <div class="container bg-danger text-center
     fs-3 text-light fw-bolder rounded-5"
    >#001 PIKACHU</div>*/

    datos.forEach((container) => {
        const div = document.createElement("DIV");
        div.value = container.name;

        //Finding the array index, which is the same than the order number of each
        //pokemon in the pokedex, so we be able to show the name and the number of the pokemon
        const number = datos.findIndex((id) => id.name === container.name) + 1;

        let numberShown;

        if (number < 10) {
            numberShown = `#000${number}`;
        } else if (number >= 10 && number < 100) {
            numberShown = `#00${number}`;
        } else if (number >= 100) {
            numberShown = `#0${number}`;
        }

        const name = container.name.toUpperCase();

        div.textContent = `${numberShown}  ${container.name.toUpperCase()}`;
        div.classList.add(
            "container",
            "bg-danger",
            "text-center",
            "fs-3",
            "text-light",
            "fw-bolder",
            "rounded-5"
        );
        scrollList.appendChild(div);
    });
}
