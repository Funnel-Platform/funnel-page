import { useState } from '#app'

export const useGeo = async () => {
  const geo = useState('geo', () => null)

  if (geo.value) return geo // Already in memory

  // Check localStorage
  const stored = process.client ? localStorage.getItem('geo') : null
  if (stored) {
    geo.value = JSON.parse(stored)
    return geo
  }

  // Fetch on client only
  if (process.client) {
    const res = await fetch('/api/geo')
    const data = await res.json()
    geo.value = data
    localStorage.setItem('geo', JSON.stringify(data))
  }

  return geo
}