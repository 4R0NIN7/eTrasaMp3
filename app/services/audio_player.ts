import { AUDIO_MAP, GeoPoint } from '@providers/data'
import { Asset } from 'expo-asset'
import { Audio } from 'expo-av'

class AudioPlayer {
  static async play(point: GeoPoint) {
    const assetModule = AUDIO_MAP[point.mp3]

    if (!assetModule) {
      console.warn(`[AudioPlayer] Missing audio file in AUDIO_MAP: ${point.mp3}`)
      return
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      })

      const asset = Asset.fromModule(assetModule)
      await asset.downloadAsync()

      const { sound } = await Audio.Sound.createAsync(asset)
      await sound.playAsync()

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          console.error('Playback error:', status.error)
          return
        }
        if (status.didJustFinish) {
          sound.unloadAsync()
        }
      })

      console.log(`[AudioPlayer] Playing: ${point.mp3}`)
    } catch (error) {
      console.error(`[AudioPlayer] Error playing ${point.mp3}:`, error)
    }
  }
}

export default AudioPlayer
