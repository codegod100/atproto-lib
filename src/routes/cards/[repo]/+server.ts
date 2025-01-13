import {getCards} from "$lib"
export async function GET({params}){
  const cards= await getCards(params.repo)
  return Response.json(cards)
}
