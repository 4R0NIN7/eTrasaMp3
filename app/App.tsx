import { NearbyLocation } from '@organisms/nearby_locations'
import { geofenceManager } from '@services/geofence_manager'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

const App = () => {
  const geofenceRef = useRef(geofenceManager)

  useEffect(() => {
    geofenceRef.current.configure()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NearbyLocation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export { App }
