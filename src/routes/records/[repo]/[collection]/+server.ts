import { getProfile,listRecords } from "$lib";

export async function GET({params}){
    // const data = await getProfile(params.handle)
    const data = await listRecords(params.repo, params.collection)
    return Response.json(data)
}
