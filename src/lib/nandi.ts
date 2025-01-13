import { cdnImage, listRecords, type Metadata, resolveHandle } from "$lib";
import {
  configureOAuth,
  getSession,
  OAuthUserAgent,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { XRPC } from "@atcute/client";
import * as TID from "@atcute/tid";

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

async function UrlPreview(url: string) {
  const resp = await fetch(
    `https://cardyb.bsky.app/v1/extract?url=${url}`,
  ).then((r) => r.json());
  return resp;
}

async function parseText(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  const previews = [];
  for (const part of parts) {
    if (part.match(/^https?:\/\//)) {
      previews.push(await UrlPreview(part));
    }
  }
  return previews;
}
type PostContext = {
  text: string;
  metadata: Metadata;
  image?: Blob;
  handle: string;
};
export async function post({ text, metadata, image, handle }: PostContext) {
  configureOAuth({ metadata });
  const { identity } = await resolveFromIdentity(handle);
  const session = await getSession(identity.id, {
    allowStale: true,
  });
  const agent = new OAuthUserAgent(session);
  const rpc = new XRPC({ handler: agent });

  let imageRecord = null;
  if (image && image.size !== 0) {
    const resp = await rpc.call("com.atproto.repo.uploadBlob", {
      data: image,
    });
    console.log({ resp });
    // const link = resp.data.blob.ref.$link;

    imageRecord = {
      $type: "blob",
      ref: {
        $link: resp.data.blob.ref.$link,
      },
      mimeType: resp.data.blob.mimeType,
      size: image.size,
    };
  }
  const links = await parseText(text);

  await rpc.call("com.atproto.repo.putRecord", {
    data: {
      repo: session.info.sub,
      collection: "nandi.schemas.card",
      rkey: TID.now(),
      record: {
        $type: "nandi.schemas.card",
        text,
        image: imageRecord,
        links,
      },
      validate: false,
    },
  });
}
