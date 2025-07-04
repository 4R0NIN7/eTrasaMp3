import { Loader } from '@atoms/loader'
import { useLocationStore } from '@hooks/use_location_store'
import { useNearbyLocation } from '@hooks/use_nearby_location'
import { LocationList } from '@molecules/location_list'
import { audioPlayer } from '@services/audio_player'
import { formatCoordinates, getDistanceMeters } from '@utils/functions'
import { Colors } from '@utils/ui/colors'
import React, { useEffect, useMemo } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: Colors.PrimaryText,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.HeadingText,
  },
  label: {
    fontSize: 17,
    marginBottom: 8,
    color: Colors.PrimaryText,
  },
  card: {
    backgroundColor: Colors.CardBackground,
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.PrimaryText,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: Colors.HeadingText,
  },
  switchRouteButton: {
    marginTop: 24,
  },
})

const NearbyLocation = () => {
  const { position } = useNearbyLocation()
  const { locations, dataset, toggleDataset } = useLocationStore()

  const currentInfo = useMemo(() => {
    if (!position) return null
    const userCoords = `Latitude: ${formatCoordinates(position.latitude)}\nLongitude: ${formatCoordinates(position.longitude)}`
    return { userCoords }
  }, [position])

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)

  useEffect(() => {
    if (currentInfo) {
      opacity.value = withTiming(1, { duration: 400 })
      translateY.value = withTiming(0, { duration: 400 })
    }
  }, [currentInfo])

  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  if (!currentInfo) {
    return <Loader message="Getting your position..." />
  }

  const nextDatasetName = dataset === 'palenica' ? 'Zakopane - Morskie Oko' : 'Palenica - Morskie Oko'

  const onPress = () => {
    audioPlayer.playRandom()
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, animatedCardStyle]}>
        <Text style={styles.heading}>All Known Locations</Text>
        {position && <LocationList position={position} locations={locations} />}
      </Animated.View>

      <Animated.View style={[styles.card, animatedCardStyle]}>
        <Text style={styles.heading}>Your Current Position</Text>
        <Text style={styles.label}>{currentInfo.userCoords}</Text>
      </Animated.View>

      <View style={styles.switchRouteButton}>
        <Button title={`Switch to ${nextDatasetName}`} onPress={toggleDataset} />
      </View>
      {/* <View style={{ marginTop: 12 }}>
        <Button title="▶️ Play random audio from current route" onPress={onPress} />
      </View> */}
    </View>
  )
}

export { NearbyLocation }
