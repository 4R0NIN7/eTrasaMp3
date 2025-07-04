import { Loader } from '@atoms/loader'
import { NearbyLocation } from '@organisms/nearby_locations'
import { GeofenceManagerProvider, useGeofenceManager } from '@providers/context/geofence_manager_context_provider'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

const AppContent = () => {
  const { isReady, error } = useGeofenceManager()
  if (error) {
    return <Loader message="Something went wrong. Please restart the app." />
  }

  return (
    <SafeAreaView style={styles.container}>
      {isReady ? <NearbyLocation /> : <Loader message="Setting things up" />}
    </SafeAreaView>
  )
}

const App = () => {
  return (
    <GeofenceManagerProvider>
      <AppContent />
    </GeofenceManagerProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export { App }
