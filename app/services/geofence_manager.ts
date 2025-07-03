import { TGeoPoint } from '@providers/location_dataset'
import { audioPlayer } from '@services/audio_player'
import { Alert } from 'react-native'
import BackgroundGeolocation, { Geofence, GeofenceEvent } from 'react-native-background-geolocation'

class GeofenceManager {
  private static _instance: GeofenceManager
  private locations: TGeoPoint[] = []

  private constructor() {
    BackgroundGeolocation.on('geofence', this.onGeofence.bind(this))
  }

  static get instance(): GeofenceManager {
    if (!this._instance) {
      this._instance = new GeofenceManager()
    }
    return this._instance
  }

  async configure(locations: TGeoPoint[]) {
    await audioPlayer.configure(locations)
    this.locations = [...locations]
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
        this.addFences(locations)
      },
    )
  }

  async updateLocations(locations: TGeoPoint[]) {
    await audioPlayer.configure(locations)
    this.locations = [...locations]
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
        this.addFences(locations)
      },
    )
  }

  private onGeofence(event: GeofenceEvent) {
    console.log(`[GEOFENCE] ${event.identifier} → ${event.action}`)
    this.handleGeofenceEvent(event)
  }

  private async handleGeofenceEvent(event: GeofenceEvent) {
    console.log(`[GEOFENCE] Event: ${event.identifier} - Action: ${event.action}`)
    const point = this.locations.find((p) => p.id === event.identifier)
    if (!point) return

    if (event.action === 'ENTER') {
      await audioPlayer.play(point)
    } else if (event.action === 'EXIT') {
      Alert.alert('Geofence Exit', `You exited: ${point.id}`)
    }
  }

  private addFences(points: TGeoPoint[]) {
    points.forEach((point) => {
      const fence: Geofence = {
        identifier: point.id,
        radius: point.radius,
        latitude: point.latitude,
        longitude: point.longitude,
        notifyOnEntry: true,
        notifyOnExit: true,
      }
      BackgroundGeolocation.removeGeofences()
      BackgroundGeolocation.addGeofence(fence)
        .then(() => console.log(`[GEOFENCE] Added: ${point.id}`))
        .catch((err) => console.warn(`[GEOFENCE] Failed to add ${point.id}`, err))
    })
  }
}

const geofenceManager = GeofenceManager.instance

export { geofenceManager }
