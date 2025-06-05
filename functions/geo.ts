export const onRequest: PagesFunction = async ({ request }) => {
  const headers = request.headers
  const host = headers.get("host") || ""
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1")
  console.log('host', host, 'isLocal', isLocal)

  const country = headers.get("cf-ipcountry") || (isLocal ? "NL" : "unknown")
  const ip = headers.get("cf-connecting-ip") || (isLocal ? "123.45.67.89" : "unknown")

  return new Response(JSON.stringify({ country, ip }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  })
}