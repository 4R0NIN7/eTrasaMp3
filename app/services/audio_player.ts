import { AUDIO_MAP, GeoPoint } from '@providers/data'
import { createAudioPlayer } from 'expo-audio'
import * as FileSystem from 'expo-file-system'

class AudioPlayer {
  private static _instance: AudioPlayer
  private playerMap = new Map<string, ReturnType<typeof createAudioPlayer>>()
  private queue: GeoPoint[] = []
  private isPlaying = false

  private constructor() {}

  static get instance(): AudioPlayer {
    if (!this._instance) {
      this._instance = new AudioPlayer()
    }
    return this._instance
  }

  async configure() {
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
    if (missing.length > 0) {
      console.warn('[AudioPlayer]🚨 Missing audio files:')
      missing.forEach(({ file }) => console.warn(`[AudioPlayer]❌ ${file}`))
    } else {
      console.log('[AudioPlayer]✅ All audio files bundled and accessible.')
    }

    console.log('[AudioPlayer] Configuration complete.')
  }

  async play(point: GeoPoint) {
    this.queue.push(point)
    if (!this.isPlaying) {
      await this.playNextInQueue()
    }
  }

  private async playNextInQueue() {
    const next = this.queue.shift()
    if (!next) {
      this.isPlaying = false
      return
    }

    const assetModule = AUDIO_MAP[next.audioFile]
    if (!assetModule) {
      console.warn(`[AudioPlayer] Missing audio file in AUDIO_MAP: ${next.audioFile}`)
      this.playNextInQueue() // skip invalid entry
      return
    }

    let player = this.playerMap.get(next.audioFile)
    if (!player) {
      player = createAudioPlayer(assetModule)
      this.playerMap.set(next.audioFile, player)
    }

    try {
      this.isPlaying = true
      player.seekTo(0)

      player.play()

      const playbackDuration = player.duration
      setTimeout(() => {
        this.isPlaying = false
        this.playNextInQueue()
      }, playbackDuration * 1000) // convert to ms
    } catch (error) {
      console.error(`[AudioPlayer] Playback error for ${next.audioFile}:`, error)
      this.isPlaying = false
      this.playNextInQueue()
    }
  }
}

const audioPlayer = AudioPlayer.instance

export { audioPlayer }
