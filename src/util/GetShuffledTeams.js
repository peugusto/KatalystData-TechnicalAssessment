import GetAllTeams from "./GetAllTeams";

export async function GetShuffledTeams() {

    const teams = shuffle(await GetAllTeams());

    const grupos = [];
    const tamanhoGrupo = 4;

    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    for (let i = 0; i < teams.length; i += tamanhoGrupo) {
        grupos.push(teams.slice(i, i + tamanhoGrupo));
    }

    console.log(grupos);
    return grupos;
}