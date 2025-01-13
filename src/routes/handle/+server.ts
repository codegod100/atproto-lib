import { getProfile } from "$lib";

export async function GET(){
    const data = await getProfile("pfrazee.com")
    return Response.json(data)
}