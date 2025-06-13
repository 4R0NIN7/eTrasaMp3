import { GeoPoint, LOCATIONS } from '@providers/data'
import BackgroundGeolocation, { Geofence, GeofenceEvent } from 'react-native-background-geolocation'
import TrackPlayer from 'react-native-track-player'

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
        preventSuspend: true, // keep running in background
      },
      (state) => {
        if (!state.enabled) {
          BackgroundGeolocation.start()
        }
        GeofenceManager.addFences(LOCATIONS)
      },
    )
  }

  static async onGeofence(event: GeofenceEvent) {
    console.log(`[GEOFENCE] ${event.identifier} → ${event.action}`)
    if (event.action === 'ENTER') {
      const point = LOCATIONS.find((p) => p.id === event.identifier)
      if (point) {
        await GeofenceManager.playSound(point)
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
        .then(() => console.log('Geofence added:', point.id))
        .catch((err) => console.warn('Failed geofence add', err))
    })
  }

  static async playSound(point: GeoPoint) {
    try {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.reset()

      await TrackPlayer.add({
        id: point.id,
        url: `bundle://${point.mp3}`,
        title: point.id,
        artist: 'GeoTrigger',
      })
      await TrackPlayer.play()
    } catch (err) {
      console.error('Audio playback failed', err)
    }
  }
}

export default GeofenceManager
