export const onRequest: PagesFunction = async ({ request }) => {
  const headers = request.headers
  const country = headers.get("cf-ipcountry") || "unknown"
  const countryName = headers.get("cf-ipcountry-name") || "unknown"
  const ip = headers.get("cf-connecting-ip") || "unknown"
  const flags = [
    'ar',
    'at',
    'au',
    'be',
    'br',
    'ca',
    'ch',
    'cl',
    'co',
    'cr',
    'cu',
    'de',
    'dk',
    'es',
    'fr',
    'gb',
    'gt',
    'hn',
    'it',
    'mx',
    'nl',
    'pe',
    'pl',
    'py',
    'se',
    'uy',
    'th',
    'my',
    'cz',
  ]

  return new Response(JSON.stringify({ country, countryName, ip, flags }), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}