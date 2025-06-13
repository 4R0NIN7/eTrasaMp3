import { LOCATIONS } from '@providers/data'
import { requestLocationPermissions } from '@services/permissions'
import { getDistanceMeters } from '@utils/functions'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

type LocationPoint = { latitude: number; longitude: number }

const NearbyLocation = () => {
  const [position, setPosition] = useState<LocationPoint | null>(null)
  const [nearbyPoint, setNearbyPoint] = useState<string | null>(null)

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

          setNearbyPoint(nearby?.id ?? null)
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
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId)
      }
    }
  }, [])

  const currentInfo = useMemo(() => {
    if (!position) return 'Getting your position...'
    const coords = `latitude=${position.latitude}, longitude=${position.longitude}`
    return nearbyPoint ? `Near: ${nearbyPoint} (${coords})` : `Your Position is ${coords}`
  }, [position, nearbyPoint])

  return <Text style={styles.text}>{currentInfo}</Text>
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
  },
})

export { NearbyLocation }
