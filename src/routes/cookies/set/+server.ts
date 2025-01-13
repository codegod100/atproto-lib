export async function POST({ cookies, request }) {
  const { key, value } = request.json();
  await cookies.set(key, value, { path: "/" });
}
