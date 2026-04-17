import 'dotenv/config'
export default async function PostResult(payload) {


    try {

        const content = await fetch(process.env.API_POST, {
            method: 'POST',
            headers: {
                'git-user': 'peugusto',
            },
            body: JSON.stringify(payload)
        });

        if (!content.ok) {
            throw new Error("ERROR API")
        }

    } catch (error) {
        console.error(error)
    }

}