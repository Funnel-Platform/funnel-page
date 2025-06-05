import { useState } from '#app'
import { flags } from '@/data/flags.js'

export const useGeo = async () => {
  const geo = useState<{
    country: string
    countryName: string
    ip: string
    flags: Array<typeof flags[number]>;
  } | null>('geo', () => null)

  if (geo.value) return geo // Already in memory

  const isLocal = process.client && ['localhost', '127.0.0.1']
    .includes(window.location.hostname)

  // For local development, we can mock the geo data
  if (process.client && isLocal) {
    geo.value = {
      country: 'NL',
      countryName: 'Netherlands',
      ip: '123.45.67.89',
      flags,
    }
    return geo
  }

  const stored = process.client ? localStorage.getItem('geo') : null
  if (stored) {
    geo.value = JSON.parse(stored)
    return geo
  }

  // Fetch on client only
  if (process.client) {
    const res = await fetch('/geo')
    const data = await res.json()
    geo.value = data
    localStorage.setItem('geo', JSON.stringify(data))
  }

  return geo
}