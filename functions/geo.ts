/**
 * This function runs on Cloudflare Workers in production.
 * You can access this via `/geo` path
 */
import { flags } from '@/data/flags.js'
import countryNames from '@/data/countryNames.json'

export const onRequest: PagesFunction = async ({ request }) => {
  const headers = request.headers
  const country = headers.get("cf-ipcountry") || "unknown"
  const ip = headers.get("cf-connecting-ip") || "unknown"

  const countryObj = countryNames.find((c) => c['alpha-2'] === country)
  const countryName = countryObj ? countryObj.name : 'Unknown'

  return new Response(JSON.stringify({ country, countryName, ip, flags }), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}