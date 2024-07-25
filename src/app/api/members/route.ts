import client from "@/lib/mongodb"
import { NumberPermissionsDocument } from "@/specs/numberPermissions"

export async function GET(request: Request) {
    try {
        const db = client.db("rap")
        const members = await db.collection<NumberPermissionsDocument>("number_permissions").find().toArray()

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
        const member = await db.collection<NumberPermissionsDocument>("number_permissions").insertOne(body);

        return Response.json(member)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}

