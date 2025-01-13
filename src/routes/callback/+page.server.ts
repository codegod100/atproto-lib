export function load({ cookies }) {
  return { referrer: cookies.get("referrer") };
}
