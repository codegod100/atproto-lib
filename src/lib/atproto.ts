import { load } from "@std/dotenv";
import {
  configureOAuth,
  createAuthorizationUrl,
  getSession,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
export type Metadata = {
  client_name: string;
  client_id: string;
  client_uri: string;
  redirect_uri: string;
  redirect_uris: [string, ...string[]];
  scope: string;
  grant_types: ["authorization_code", "refresh_token"];
  response_types: ["code"];
  application_type: "web";
  token_endpoint_auth_method: "none";
  dpop_bound_access_tokens: boolean;
};

export async function metadata() {
  await load({ export: true })
  const publicUrl = Deno.env.get("PUBLIC_URL");
  const url = publicUrl || `http://127.0.0.1:4321`;
  const enc = encodeURIComponent;
  return {
    client_name: "nandi oauth",
    client_id: publicUrl
      ? `${url}/client-metadata.json`
      : `http://localhost?redirect_uri=${enc(`${url}/callback`)}&scope=${
        enc(
          "atproto transition:generic",
        )
      }`,

    client_uri: url,
    redirect_uri: `${url}/callback`,
    redirect_uris: [`${url}/callback`],
    scope: "atproto transition:generic",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
  };
}

export async function authorizationUrl(handle: string, metadata: Metadata) {
  configureOAuth({ metadata });
  const res = await resolveFromIdentity(handle);
  return await createAuthorizationUrl({
    metadata: res.metadata,
    identity: res.identity,
    scope: "atproto transition:generic",
  });
}
