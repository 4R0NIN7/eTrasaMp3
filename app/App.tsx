import GeofenceManager from '@services/background_location'
import { requestLocationPermissions } from '@services/permissions'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import TrackPlayer, { Capability, IOSCategory, IOSCategoryOptions } from 'react-native-track-player'

const App = () => {
  const [position, setPosition] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    ;(async () => {
      const granted = await requestLocationPermissions()
      if (!granted) return

      GeofenceManager.configure()

      Geolocation.getCurrentPosition(
        (pos) =>
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (error) => console.error(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      )

      await TrackPlayer.setupPlayer({
        iosCategory: IOSCategory.Playback,
        iosCategoryOptions: [IOSCategoryOptions.DuckOthers],
        waitForBuffer: true,
      })

      await TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
        alwaysPauseOnInterruption: true,
      })
    })()
  }, [])

  const currentPosition = useMemo(
    () => `Your Position is latitude=${position?.latitude} longitude=${position?.longitude}`,
    [],
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{currentPosition}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { textAlign: 'center', fontSize: 18, padding: 10 },
  map: { flex: 1 },
})

export default App
