export const onRequest: PagesFunction = async ({ request }) => {
  const country = request.headers.get("cf-ipcountry");
  const ip = request.headers.get("cf-connecting-ip");

  return new Response(JSON.stringify({ country, ip }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
};