import { cdnImage, listRecords, resolveHandle } from "$lib";

import { type ComAtprotoRepoListRecords } from "@atcute/client/lexicons";
interface Card extends ComAtprotoRepoListRecords.Record {
  image?: string;
  value: {
    image?: {
      ref: {
        $link: string;
      };
    };
  };
}
export async function getCards(repo: string) {
  const did = await resolveHandle(repo).then((r) => r.did);
  const cards: Card[] = await listRecords(repo, "nandi.schemas.card").then((
    r,
  ) => r.records);
  console.log({ cards });
  return cards.map((card) => {
    if (card.value.image) {
      card.image = cdnImage(did, card.value.image.ref.$link);
    }
    return card;
  });
}
