import { AUDIO_MAP, GeoPoint } from '@providers/data'
import { createAudioPlayer } from 'expo-audio'
import * as FileSystem from 'expo-file-system'

class AudioPlayer {
  private static playerMap = new Map<string, ReturnType<typeof createAudioPlayer>>()

  static async configure() {
    console.log('[AudioPlayer] Configuring audio assets...')

    const audioFiles = Object.keys(AUDIO_MAP)
    const results = await Promise.all(
      audioFiles.map(async (file) => {
        const assetPath = `${FileSystem.bundleDirectory}assets/audio/${file}`
        const fileInfo = await FileSystem.getInfoAsync(assetPath)
        return { file, exists: fileInfo.exists }
      }),
    )

    const missing = results.filter((r) => !r.exists)

    if (missing.length === 0) {
      console.log('[AudioPlayer]✅ All audio files are bundled and accessible.')
    } else {
      console.warn('[AudioPlayer]🚨 Missing audio files:')
      missing.forEach(({ file }) => console.warn(`[AudioPlayer]❌ ${file}`))
    }

    console.log('[AudioPlayer] Configuration complete.')
  }

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
