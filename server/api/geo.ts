export default defineEventHandler((event) => {
  const isLocal = process.env.NODE_ENV === 'development'

  const mockCountry = 'NL'
  const mockIP = '123.45.67.89'

  const country = isLocal ? mockCountry : getHeader(event, 'cf-ipcountry') || 'unknown'
  const ip = isLocal ? mockIP : getHeader(event, 'cf-connecting-ip') || 'unknown'

  return {
    country,
    ip
  }
})