import { AUDIO_MAP, GeoPoint } from '@providers/data'
import { createAudioPlayer } from 'expo-audio'

class AudioPlayer {
  private static playerMap = new Map<string, ReturnType<typeof createAudioPlayer>>()

  static async play(point: GeoPoint) {
    const assetModule = AUDIO_MAP[point.audioFile]
    if (!assetModule) {
      console.warn(`[AudioPlayer] Missing audio file in AUDIO_MAP: ${point.audioFile}`)
      return
    }

    let player = AudioPlayer.playerMap.get(point.audioFile)
    if (!player) {
      player = createAudioPlayer(assetModule)
      AudioPlayer.playerMap.set(point.audioFile, player)
    }

    try {
      player.seekTo(0)
      await player.play()
      console.log(`[AudioPlayer] Playing: ${point.audioFile}`)
    } catch (error) {
      console.error(`[AudioPlayer] Playback error for ${point.audioFile}:`, error)
    }
  }
}

export default AudioPlayer
