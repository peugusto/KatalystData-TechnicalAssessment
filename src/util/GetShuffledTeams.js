import GetAllTeams from "./GetAllTeams";

export async function GetShuffledTeams(mockdata = null) {

    const data = mockdata ? mockdata : await GetAllTeams()
    const teams = shuffle(data);

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