import getMockedGroups from "./MockTeams";

export default async function GetAllTeams(){
    const content = await fetch("/api/WorldCup/GetAllTeams", {
        headers:{
            'git-user':'peugusto',
        }
    });

    if(!content.ok){
        const teams = getMockedGroups();
        console.error("ERRO API")
        return teams;
    }

    const teams = await content.json();
    console.log(teams);
    
    return teams;
}