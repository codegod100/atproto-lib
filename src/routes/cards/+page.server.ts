import { getCards, metadata } from "$lib";
import { redirect } from "@sveltejs/kit";
export async function load({ cookies }) {
  const handle = cookies.get("handle");
  console.log({ handle });
  if (!handle) {
    cookies.set("referrer", "/cards", { path: "/" });
    throw redirect(307, "/auth");
  }
  const cards = await getCards(handle);
  return { cards, meta: await metadata() };
}
