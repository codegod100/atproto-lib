import { cdnImage, listRecords, resolveHandle } from "$lib";

interface Card {
  image?: string;
  value: {
    image?: {
      ref: {
        $link: string;
      };
    };
    text?: string;
    links?: {
      url: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
}
export async function getCards(repo: string) {
  const did = await resolveHandle(repo).then((r) => r.did);
  const cards: Card[] = await listRecords(repo, "nandi.schemas.card").then((
    r,
  ) => r.records as Card[]);
  return cards.map((card) => {
    if (card.value.image) {
      card.image = cdnImage(did, card.value.image.ref.$link);
    }
    if (card.value.links) {
      for (const link of card.value.links) {
        link.image = link.image.replace(
          /^https:\/\/cardyb\.bsky\.app\/v1\/image\?url=/,
          "",
        );
        link.image = decodeURIComponent(link.image);
      }
    }
    return card;
  });
}
