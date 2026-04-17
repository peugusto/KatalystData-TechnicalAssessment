
export default async function PostResult(payload) {


    try {

        const content = await fetch("/api/WorldCup/FinalResult", {
            method: 'POST',
            headers: {
                'git-user': 'peugusto',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!content.ok) {
            throw new Error("Erro api")
        }
        console.log("enviado")

    } catch (error) {
        console.error(error)
    }

}