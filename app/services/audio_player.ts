import { GeoPoint, LOCATIONS, STATIC_AUDIO_REQUIRE_MAP } from '@providers/data'
import { createAudioPlayer } from 'expo-audio'
import * as FileSystem from 'expo-file-system'

class AudioPlayer {
  private static _instance: AudioPlayer
  private playerMap = new Map<string, ReturnType<typeof createAudioPlayer>>()
  private queue: GeoPoint[] = []
  private isPlaying = false
  private audioMap: Record<string, number> = {}

  private constructor() {}

  static get instance(): AudioPlayer {
    if (!this._instance) {
      this._instance = new AudioPlayer()
    }
    return this._instance
  }

  async configure() {
    console.log('[AudioPlayer] Configuring audio files...')

    this.audioMap = {}
    for (const point of LOCATIONS) {
      const audio = STATIC_AUDIO_REQUIRE_MAP[point.audioFile]
      if (audio) {
        this.audioMap[point.audioFile] = audio
      } else {
        console.warn(`[AudioPlayer] ❌ Missing audio asset for: ${point.audioFile}`)
      }
    }

    const results = await Promise.all(
      Object.keys(this.audioMap).map(async (file) => {
        const assetPath = `${FileSystem.bundleDirectory}assets/audio/${file}`
        const fileInfo = await FileSystem.getInfoAsync(assetPath)
        return { file, exists: fileInfo.exists }
      }),
    )

    const missing = results.filter((r) => !r.exists)
    if (missing.length === 0) {
      console.log('[AudioPlayer] ✅ All audio files are accessible.')
    } else {
      console.warn('[AudioPlayer] 🚨 Missing audio files:')
      missing.forEach(({ file }) => console.warn(`  - ${file}`))
    }
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

    const assetModule = this.audioMap[next.audioFile]
    if (!assetModule) {
      console.warn(`[AudioPlayer] Missing audio file in AUDIO_MAP: ${next.audioFile}`)
      this.playNextInQueue()
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
      }, playbackDuration * 1000)
    } catch (error) {
      console.error(`[AudioPlayer] Playback error for ${next.audioFile}:`, error)
      this.isPlaying = false
      this.playNextInQueue()
    }
  }
}

const audioPlayer = AudioPlayer.instance

export { audioPlayer }
