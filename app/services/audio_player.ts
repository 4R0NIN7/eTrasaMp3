import { AUDIO_MAP, GeoPoint } from '@providers/data'
import { createAudioPlayer } from 'expo-audio'

class AudioPlayer {
  private static playerMap = new Map<string, ReturnType<typeof createAudioPlayer>>()

  static async play(point: GeoPoint) {
    const assetModule = AUDIO_MAP[point.mp3]
    if (!assetModule) {
      console.warn(`[AudioPlayer] Missing audio file in AUDIO_MAP: ${point.mp3}`)
      return
    }

    let player = AudioPlayer.playerMap.get(point.mp3)
    if (!player) {
      player = createAudioPlayer(assetModule)
      AudioPlayer.playerMap.set(point.mp3, player)
    }

    try {
      player.seekTo(0)
      await player.play()
      console.log(`[AudioPlayer] Playing: ${point.mp3}`)
    } catch (error) {
      console.error(`[AudioPlayer] Playback error for ${point.mp3}:`, error)
    }
  }
}

export default AudioPlayer
