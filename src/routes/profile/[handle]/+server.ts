import { getProfile, listRecords } from "$lib";

export async function GET({ params }) {
  const data = await getProfile(params.handle);

  return Response.json(data);
}
