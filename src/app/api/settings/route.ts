import client from "@/lib/mongodb"
import { ConfigsDocument } from "@/specs/configs"

export async function GET(request: Request) {
    try {
        const db = client.db("rap")
        const config = await db.collection<ConfigsDocument>("configs").findOne({
            type: "general"
        })

        return Response.json(config)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}

export async function POST(request: Request, response: Response) {
    try {
        const db = client.db("rap")
        const body = await request.json()
        const config = await db.collection<ConfigsDocument>("configs").findOneAndUpdate(
            { type: "general" },
            { $set: { defaultMemberConfigs: body } },
            { upsert: true, returnDocument: "after" }
        )

        const res = await fetch("http://142.93.201.180/updateConfigs")

        if (!res.ok) {
            throw new Error("Failed to update configs on application")
        }

        return Response.json(config)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
