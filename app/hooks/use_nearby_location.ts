import { requestLocationPermissions } from '@services/permissions'
import { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'

type TLocationPoint = { latitude: number; longitude: number }

export function useNearbyLocation() {
  const [position, setPosition] = useState<TLocationPoint | null>(null)

  useEffect(() => {
    let watchId: number
    ;(async () => {
      const granted = await requestLocationPermissions()
      if (!granted) return

      watchId = Geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          setPosition({ latitude: lat, longitude: lon })
        },
        (error) => console.error('Failed to watch location:', error),
        {
          enableHighAccuracy: true,
          distanceFilter: 2,
          interval: 5000,
          fastestInterval: 2000,
        },
      )
    })()

    return () => {
      if (watchId !== undefined) Geolocation.clearWatch(watchId)
    }
  }, [])

  return { position }
}
