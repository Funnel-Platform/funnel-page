import { useState } from '#app'

export const useGeo = async () => {
  const geo = useState('geo', () => null)

  if (geo.value) return geo // Already in memory

  const isLocal = process.client && ['localhost', '127.0.0.1'].includes(window.location.hostname)

  const stored = process.client ? localStorage.getItem('geo') : null
  if (stored && !isLocal) {
    geo.value = JSON.parse(stored)
    return geo
  }

  // Fetch on client only
  if (process.client) {
    console.log('%c fetch.. ', 'background:red;color:white;padding:5px;');
    const res = await fetch('/api/geo')
    const data = await res.json()
    geo.value = data
    localStorage.setItem('geo', JSON.stringify(data))
  }

  return geo
}