
import client from "@/lib/mongodb"

export async function GET(request: Request) {
    try {
        const db = client.db("rap")
        const members = await db.collection("members").find().toArray()

        return Response.json(members)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}

export async function POST(request: Request, response: Response) {
    try {
        const db = client.db("rap")
        const body = await request.json()
        const member = await db.collection("members").insertOne(body);

        return Response.json(member)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
