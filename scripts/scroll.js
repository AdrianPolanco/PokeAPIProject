import { basicInfo } from "./basicInfo.js";

const scrollList = document.querySelector("#scroll-list");
const scrollUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=493";

export function cargarScroll() {
    fetch(scrollUrl)
        .then((respuesta) => respuesta.json())
        .then((datos) => crearDivs(datos.results));
}
/*NOTA: Puedo agregar a esta funcion un  parametro adicional con
true o false, un 1 o un 0 o cualquier mecanismo para distinguir
cuando buscamos a través del buscador de cuando se busca a través de la lista en el scroll, en caso de que
una condicion determinada se cumpla o no(si por ejemplo el segundo parametro es falso, la funcion
    ejecutará como lo ha hecho hasta ahora, si le paso el parametro que agregare como true pues 
    hare que me busque el pokemon de la lista convirtiendo el string del usuario en un LowerCase
    y aplicandole trim, y de ahí comparanado si en el JSON que nos devuelva la API entonces lo enseñamos o no)*/
function crearDivs(datos = []) {
    /* <div class="container bg-danger text-center
     fs-3 text-light fw-bolder rounded-5"
    >#001 PIKACHU</div>*/

    datos.forEach((container) => {
        const div = document.createElement("DIV");
        div.id = container.name;

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

        const nameShown = container.name.toUpperCase();

        div.onclick = function (e) {
            basicInfo(nameShown, numberShown, number);
        };

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
