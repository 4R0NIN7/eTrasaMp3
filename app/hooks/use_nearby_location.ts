import { GeoPoint, LOCATIONS } from '@providers/data'
import { requestLocationPermissions } from '@services/permissions'
import { getDistanceMeters } from '@utils/functions'
import { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'

type LocationPoint = { latitude: number; longitude: number }

export function useNearbyLocation() {
  const [position, setPosition] = useState<LocationPoint | null>(null)
  const [nearbyPoint, setNearbyPoint] = useState<GeoPoint | undefined>()

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

          const nearby = LOCATIONS.find((point) => {
            const dist = getDistanceMeters(lat, lon, point.latitude, point.longitude)
            return dist <= point.radius
          })

          setNearbyPoint(nearby)
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

  return { position, nearbyPoint }
}
