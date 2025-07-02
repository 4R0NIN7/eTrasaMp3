import { Loader } from '@atoms/loader'
import { useAppInitialization } from '@hooks/use_app_initialization'
import { NearbyLocation } from '@organisms/nearby_locations'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

const App = () => {
  const { isReady, error } = useAppInitialization()

  if (error) {
    return <Loader message="Something went wrong. Please restart the app." />
  }

  return (
    <SafeAreaView style={styles.container}>
      {isReady ? <NearbyLocation /> : <Loader message="Setting things up" />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export { App }
