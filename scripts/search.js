import { showDetails, changeName } from "./basicInfo.js";
import { showStats } from "./detailedInfo.js";

const inputSearch = document.querySelector("#search");

export function searchInfo() {
    let info = inputSearch.value;

    if (info == "SHAYMIN" || info == "shaymin") {
        info = "shaymin-land";
    }

    const finalInfo = info.trim();

    const url = `https://pokeapi.co/api/v2/pokemon/${finalInfo.toLowerCase()}`;

    fetch(url)
        .then((request) => request.json())
        .then((data) => {
            showDetails(data);
            showStats(data.stats);
            let numberShown;

            if (data.id < 10) {
                numberShown = `#000${data.id}`;
            } else if (data.id >= 10 && data.id < 100) {
                numberShown = `#00${data.id}`;
            } else if (data.id >= 100) {
                numberShown = `#0${data.id}`;
            }
            changeName(finalInfo, numberShown);
        })
        .catch((error) => {
            Swal.fire({
                title: "¡Error!",
                text: "The pokemon you are looking for does not exist or is after the fourth generation",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
}
