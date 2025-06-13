import { Platform } from 'react-native'
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions'

export async function requestLocationPermissions(): Promise<boolean> {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  })

  if (!permission) return false

  const result = await check(permission)
  if (result === RESULTS.GRANTED) return true

  const requestResult = await request(permission)
  if (requestResult === RESULTS.GRANTED) return true

  if (requestResult === RESULTS.BLOCKED) openSettings()
  return false
}
