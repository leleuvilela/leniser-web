import client from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    //get member by prop id from the route
    const { id } = params;

    try {
        const db = client.db("rap")
        const member = await db.collection("members").findOne({ id })

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
        const member = await db.collection("members").updateOne({ id }, { $set: body });

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
        const member = await db.collection("members").deleteOne({ id })

        return Response.json(member)
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
