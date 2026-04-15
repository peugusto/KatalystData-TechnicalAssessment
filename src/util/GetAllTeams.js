export default async function GetAllTeams(){
    const content = await fetch("/api/WorldCup/GetAllTeams", {
        headers:{
            'git-user':'peugusto',
        }
    });

    if(!content.ok){
        throw new Error("ERROR API")
    }

    const teams = await content.json();
    console.log(teams);
    
    return teams;
}