import { GeoPoint, LOCATIONS } from '@providers/data'
import { requestLocationPermissions } from '@services/permissions'
import { getDistanceMeters } from '@utils/functions'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

type LocationPoint = { latitude: number; longitude: number }

const NearbyLocation = () => {
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
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId)
      }
    }
  }, [])

  const currentInfo = useMemo(() => {
    if (!position) return null

    const yourCoords = `Latitude: ${position.latitude.toFixed(5)}\nLongitude: ${position.longitude.toFixed(5)}`
    let distanceText = ''
    let pointCoords = ''
    let pointRadius = ''

    if (nearbyPoint) {
      const dist = getDistanceMeters(position.latitude, position.longitude, nearbyPoint.latitude, nearbyPoint.longitude)

      distanceText = `${dist.toFixed(1)} meters away`
      pointCoords = `Latitude: ${nearbyPoint.latitude.toFixed(5)}, Longitude: ${nearbyPoint.longitude.toFixed(5)}`
      pointRadius = `Radius: ${nearbyPoint.radius}m`
    }

    return { yourCoords, pointCoords, pointRadius, distanceText }
  }, [position, nearbyPoint])

  if (!currentInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Getting your position...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {nearbyPoint ? (
          <>
            Near: <Text style={styles.bold}>{nearbyPoint.id}</Text>
          </>
        ) : (
          'No nearby location'
        )}
      </Text>

      <View style={[styles.section, styles.card]}>
        <Text style={styles.label}>Your Position</Text>
        <Text style={styles.text}>{currentInfo.yourCoords}</Text>
      </View>

      {nearbyPoint && (
        <View style={[styles.section, styles.card]}>
          <Text style={styles.label}>{nearbyPoint.id.toUpperCase()} Location</Text>
          <Text style={styles.text}>{currentInfo.pointCoords}</Text>
          <Text style={styles.radius}>{currentInfo.pointRadius}</Text>
          <Text style={styles.distance}>{currentInfo.distanceText}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 24,
  },
  bold: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  section: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  radius: {
    fontSize: 16,
    color: '#6a5acd',
    marginTop: 8,
  },
  distance: {
    fontSize: 16,
    color: '#2a9d8f',
    fontWeight: '500',
    marginTop: 4,
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888',
  },
})

export { NearbyLocation }
