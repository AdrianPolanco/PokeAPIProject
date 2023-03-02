const hpStat = document.querySelector("#hpStat");
const attackStat = document.querySelector("#attackStat");
const sattackStat = document.querySelector("#sattackStat");
const defenseStat = document.querySelector("#defenseStat");
const sdefenseStat = document.querySelector("#sdefenseStat");
const speedStat = document.querySelector("#speedStat");

const hpNumber = document.querySelector("#hpNumber");
const attackNumber = document.querySelector("#attackNumber");
const sattackNumber = document.querySelector("#sattackNumber");
const defenseNumber = document.querySelector("#defenseNumber");
const sdefenseNumber = document.querySelector("#sdefenseNumber");
const speedNumber = document.querySelector("#speedNumber");

const arrayStats = [
    [hpStat, hpNumber],
    [attackStat, attackNumber],
    [defenseStat, defenseNumber],
    [sattackStat, sattackNumber],
    [sdefenseStat, sdefenseNumber],
    [speedStat, speedNumber],
];

export function showStats(data = []) {
    //console.log(((120 / 220) * 100).toFixed(2) + "%"); PORCENTAJE
    let counter = 0;
    arrayStats.forEach((stat) => {
        const actualStat = data[counter]["base_stat"];
        stat[1].textContent = actualStat;
        const statProgress = ((actualStat / 220) * 100).toFixed(2);
        stat[0].style = `width: ${statProgress}%`;

        counter += 1;
    });
}
