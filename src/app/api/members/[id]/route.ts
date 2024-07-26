import client from "@/lib/mongodb"
import { MemberDocument } from "@/specs/numberPermissions";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    //get member by prop id from the route
    const { id } = params;

    try {
        const db = client.db("rap")
        const member = await db.collection<MemberDocument>("members").findOne({ id })

        return Response.json(member)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    //get member by prop id from the route
    const { id } = params;

    try {
        const db = client.db("rap")
        const body = await request.json()
        const member = await db.collection<MemberDocument>("members").updateOne({ id }, { $set: body });

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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const db = client.db("rap")
        const member = await db.collection<MemberDocument>("members").deleteOne({ id })

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
