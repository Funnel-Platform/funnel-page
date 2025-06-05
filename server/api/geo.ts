export default defineEventHandler((event) => {
  const isLocal = process.env.NODE_ENV === 'development'

  const mockCountry = 'NL'
  const mockCountryName = 'Netherlands'
  const mockIP = '123.45.67.89'

  const country = isLocal ? mockCountry : getHeader(event, 'cf-ipcountry') || 'unknown'
  const countryName = isLocal ? mockCountryName : getHeader(event, 'cf-ipcountry-name') || 'unknown'
  const ip = isLocal ? mockIP : getHeader(event, 'cf-connecting-ip') || 'unknown'
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

  return {
    country,
    countryName,
    ip,
    flags,
  }
})