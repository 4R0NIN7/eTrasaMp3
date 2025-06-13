import { NearbyLocation } from '@organisms/nearby_locations'
import GeofenceManager from '@services/geofence_manager'
import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

const App = () => {
  useEffect(() => {
    ;(async () => {
      GeofenceManager.configure()
    })()
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
