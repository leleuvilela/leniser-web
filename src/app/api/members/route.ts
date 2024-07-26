import client from "@/lib/mongodb"
import { MemberDocument } from "@/specs/numberPermissions"

export async function GET(request: Request) {
    try {
        const db = client.db("rap")
        const members = await db.collection<MemberDocument>("members").find().toArray()

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
        const member = await db.collection<MemberDocument>("members").insertOne(body);

        const res = await fetch("http://142.93.201.180/updateConfigs")

        if (!res.ok) {
            throw new Error("Failed to update configs on application")
        }

        return Response.json(member)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}

