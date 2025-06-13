import { GeoPoint, LOCATIONS } from '@providers/data'
import AudioPlayer from '@services/audio_player'
import BackgroundGeolocation, { Geofence, GeofenceEvent } from 'react-native-background-geolocation'

class GeofenceManager {
  static configure() {
    BackgroundGeolocation.on('geofence', GeofenceManager.onGeofence)

    BackgroundGeolocation.ready(
      {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 50,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        geofenceProximityRadius: 1000,
        showsBackgroundLocationIndicator: true,
        preventSuspend: true,
      },
      (state) => {
        if (!state.enabled) {
          BackgroundGeolocation.start()
        }
        GeofenceManager.addFences(LOCATIONS)
      },
    )
  }

  static onGeofence(event: GeofenceEvent) {
    console.log(`[GEOFENCE] ${event.identifier} → ${event.action}`)
    GeofenceManager.handleGeofenceEvent(event)
  }

  static async handleGeofenceEvent(event: GeofenceEvent) {
    console.log(`[GEOFENCE] Event: ${event.identifier} - Action: ${event.action}`)
    if (event.action === 'ENTER') {
      const point = LOCATIONS.find((p) => p.id === event.identifier)
      if (point) {
        await AudioPlayer.play(point)
      }
    }
  }

  static addFences(points: GeoPoint[]) {
    points.forEach((point) => {
      const fence: Geofence = {
        identifier: point.id,
        radius: point.radius,
        latitude: point.latitude,
        longitude: point.longitude,
        notifyOnEntry: true,
        notifyOnExit: false,
      }

      BackgroundGeolocation.addGeofence(fence)
        .then(() => console.log(`[GEOFENCE] Added: ${point.id}`))
        .catch((err) => console.warn(`[GEOFENCE] Failed to add ${point.id}`, err))
    })
  }
}

export default GeofenceManager
