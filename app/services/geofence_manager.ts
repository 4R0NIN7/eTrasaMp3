import { TGeoPoint } from '@providers/location_dataset.types'
import { audioPlayer } from '@services/audio_player'
import { Alert } from 'react-native'
import BackgroundGeolocation, { Geofence, GeofenceEvent } from 'react-native-background-geolocation'

class GeofenceManager {
  private static _instance: GeofenceManager
  private locations: TGeoPoint[] = []
  private geofenceListenerRegistered = false

  private constructor() {}

  private registerGeofenceListener() {
    console.log(`#registerGeofenceListener - geofenceListenerRegistered=${this.geofenceListenerRegistered}`)
    if (this.geofenceListenerRegistered) return
    BackgroundGeolocation.on('geofence', this.onGeofence.bind(this))
    BackgroundGeolocation.on('location', this.onLocation.bind(this))
    BackgroundGeolocation.on('geofenceschange', this.onGeofencesChange.bind(this))
    this.geofenceListenerRegistered = true
  }

  static get instance(): GeofenceManager {
    if (!this._instance) {
      this._instance = new GeofenceManager()
    }
    return this._instance
  }

  private onLocation(location: Location) {
    console.log('[LOCATION] update:', location)
  }

  private onGeofencesChange(event: GeofenceEvent) {
    console.log('[GEOFENCE] fences change:', event)
  }

  async configure(locations: TGeoPoint[]) {
    await this.setup(locations, true)
  }

  async updateLocations(locations: TGeoPoint[]) {
    await this.setup(locations, false)
  }

  private async setup(locations: TGeoPoint[], isInitial: boolean) {
    await audioPlayer.configure(locations)
    const previousLocations = [...this.locations]
    this.locations = [...locations]

    this.registerGeofenceListener()

    if (isInitial) {
      const state = await BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 50,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        geofenceProximityRadius: 1000,
        showsBackgroundLocationIndicator: true,
        preventSuspend: true,
      })

      if (!state.enabled) {
        await BackgroundGeolocation.start()
      }
    }

    await this.addFences(locations, previousLocations)
  }

  private onGeofence(event: GeofenceEvent) {
    console.log(`[GEOFENCE] ${event.identifier} → ${event.action}`)
    this.handleGeofenceEvent(event)
  }

  private async handleGeofenceEvent(event: GeofenceEvent) {
    console.log(`#handleGeofenceEvent event=${event}}`)
    const point = this.locations.find((p) => p.id === event.identifier)
    console.log(`#handleGeofenceEvent point=${event}}`)
    if (!point) return

    if (event.action === 'ENTER') {
      await audioPlayer.play(point)
    } else if (event.action === 'EXIT') {
      Alert.alert('Geofence Exit', `You exited: ${point.id}`)
    }
  }

  private async addFences(points: TGeoPoint[], previousPoints: TGeoPoint[]) {
    await BackgroundGeolocation.removeGeofences()

    const fences: Geofence[] = points.map((point) => ({
      identifier: point.id,
      radius: point.radius,
      latitude: point.latitude,
      longitude: point.longitude,
      notifyOnEntry: true,
      notifyOnExit: true,
    }))

    await BackgroundGeolocation.addGeofences(fences)
      .then(() => {
        console.log(`[GEOFENCE] Added ${fences.length} fences - ${fences.map((el) => el.identifier)}`)
      })
      .catch((err) => {
        console.warn('[GEOFENCE] Failed to add fences', err)
      })
    await BackgroundGeolocation.getGeofences((geofences) => {
      console.log('[GEOFENCE] Active geofences:', geofences)
    })
  }
}

const geofenceManager = GeofenceManager.instance

export { geofenceManager, GeofenceManager }
