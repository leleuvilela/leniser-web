import client from "@/lib/mongodb"

export async function GET(request: Request) {
    try {
        const db = client.db("rap")
        const configs = await db.collection("configs").find().toArray()

        return Response.json(configs[0])
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}

export async function POST(request: Request, response: Response) {
    try {
        const db = client.db("rap")
        const body = await request.json()
        const config = await db.collection("configs").findOneAndUpdate(
            {},
            { $set: body },
            { upsert: true, returnDocument: "after" }
        )

        return Response.json(config)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
