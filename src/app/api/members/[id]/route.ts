import client from "@/lib/mongodb"
import { NumberPermissionsDocument } from "@/specs/numberPermissions";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    //get member by prop id from the route
    const { id } = params;

    try {
        const db = client.db("rap")
        const member = await db.collection<NumberPermissionsDocument>("number_permissions").findOne({ _id: id })

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
        const member = await db.collection<NumberPermissionsDocument>("number_permissions").updateOne({ _id: id }, { $set: body });

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
        const member = await db.collection<NumberPermissionsDocument>("number_permissions").deleteOne({ _id: id })

        return Response.json(member)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
