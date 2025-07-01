import { useNearbyLocation } from '@hooks/use_nearby_location'
import { LocationList } from '@molecules/location_list'
import { formatCoordinates, formatDistance, getDistanceMeters } from '@utils/functions'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NearbyLocation = () => {
  const { position, nearbyPoint } = useNearbyLocation()

  const currentInfo = useMemo(() => {
    if (!position) return null

    const userCoords = `Latitude: ${formatCoordinates(position.latitude)}\nLongitude: ${formatCoordinates(position.longitude)}`

    if (!nearbyPoint) {
      return { userCoords }
    }

    const distance = getDistanceMeters(
      position.latitude,
      position.longitude,
      nearbyPoint.latitude,
      nearbyPoint.longitude,
    )

    const locationCoords = `Latitude: ${nearbyPoint.latitude.toFixed(5)}, Longitude: ${nearbyPoint.longitude.toFixed(5)}`
    const radius = `Radius: ${nearbyPoint.radius}m`
    const formattedDistance = formatDistance(distance)

    return {
      userCoords,
      locationCoords,
      radius,
      formattedDistance,
    }
  }, [position, nearbyPoint])

  if (!currentInfo) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.loadingText}>Getting your position...</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>All Known Locations</Text>
        {position && <LocationList position={position} highlightId={nearbyPoint?.id} />}
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Your Current Position</Text>
        <Text style={styles.label}>{currentInfo.userCoords}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: '#d2e1df',
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 16,
    color: '#ffffff',
  },
  label: {
    fontSize: 17,
    marginBottom: 8,
    color: '#d2e1df',
  },
  card: {
    backgroundColor: '#003f42',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#d2e1df',
  },
})

export { NearbyLocation }
