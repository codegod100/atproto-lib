import { metadata } from "$lib";
export async function GET(){
    return Response.json(await metadata())
}