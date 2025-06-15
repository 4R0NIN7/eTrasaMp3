import { Platform } from 'react-native'
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions'

export async function requestLocationPermissions(): Promise<boolean> {
  const fineLocation = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  })

  if (!fineLocation) return false

  let result = await check(fineLocation)
  if (result === RESULTS.GRANTED) {
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      const bgPermission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
      const bgResult = await check(bgPermission)
      if (bgResult === RESULTS.GRANTED) return true

      const requestBg = await request(bgPermission)
      return requestBg === RESULTS.GRANTED
    }

    return true
  }

  const requestResult = await request(fineLocation)
  if (requestResult === RESULTS.GRANTED) {
    if (Platform.OS === 'android' && Platform.Version >= 29) {
      const bgPermission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
      const bgResult = await check(bgPermission)
      if (bgResult === RESULTS.GRANTED) return true

      const requestBg = await request(bgPermission)
      return requestBg === RESULTS.GRANTED
    }

    return true
  }

  if (requestResult === RESULTS.BLOCKED) {
    openSettings()
  }

  return false
}
