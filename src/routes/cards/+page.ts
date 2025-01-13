import { getCards } from "$lib";

export async function load() {
  const cards = await getCards("nandi.dads.lol");
  return { cards };
}
