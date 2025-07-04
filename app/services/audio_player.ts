import { TGeoPoint } from '@providers/location_dataset.types'
import { STATIC_AUDIO_REQUIRE_MAP } from '@providers/media_file_dataset.types'
import { createAudioPlayer } from 'expo-audio'

class AudioPlayer {
  private static _instance: AudioPlayer
  private activePlayer: ReturnType<typeof createAudioPlayer> | null = null
  private activeAudioKey: string | null = null
  private isPlaying = false
  private audioMap: Record<string, number> = {}
  private audioFileToPointMap = new Map<string, TGeoPoint>()
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  private constructor() {}

  static get instance(): AudioPlayer {
    if (!this._instance) {
      this._instance = new AudioPlayer()
    }
    return this._instance
  }

  async configure(locations: TGeoPoint[]) {
    await this.stop()

    this.audioMap = {}
    this.audioFileToPointMap.clear()
    this.activeAudioKey = null
    this.isPlaying = false

    locations.forEach((point) => {
      const audio = STATIC_AUDIO_REQUIRE_MAP[point.audioFile]
      if (audio) {
        this.audioMap[point.audioFile] = audio
        this.audioFileToPointMap.set(point.audioFile, point)
      } else {
        console.warn(`[AudioPlayer] Missing audio for: ${point.audioFile}`)
      }
    })
  }

  async stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    if (this.activePlayer) {
      try {
        this.activePlayer.pause()
        this.activePlayer.seekTo(0)
      } catch (err) {
        console.warn('[AudioPlayer] Failed to stop audio:', err)
      }
    }

    this.isPlaying = false
    this.activePlayer = null
    this.activeAudioKey = null
  }

  async play(point: TGeoPoint) {
    if (this.isPlaying && this.activeAudioKey === point.audioFile) {
      console.log(`[AudioPlayer] Already playing: ${point.audioFile}`)
      return
    }

    console.log('[AudioPlayer] play →', point.audioFile)
    await this.stop()

    const assetModule = this.audioMap[point.audioFile]
    if (!assetModule) {
      console.warn(`[AudioPlayer] Audio file not found for: ${point.audioFile}`)
      return
    }

    const player = createAudioPlayer(assetModule)
    this.activePlayer = player
    this.activeAudioKey = point.audioFile
    this.isPlaying = true

    player.seekTo(0)
    player.play()

    const duration = player.duration ?? 1
    this.timeoutId = setTimeout(
      () => {
        this.cleanup()
      },
      duration * 1000 + 500,
    )
  }

  async playRandom() {
    const keys = Object.keys(this.audioMap)
    if (keys.length === 0) {
      console.warn('[AudioPlayer] No audio files in map')
      return
    }

    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    const point = this.audioFileToPointMap.get(randomKey)

    if (!point) {
      console.warn(`[AudioPlayer] No TGeoPoint for ${randomKey}`)
      return
    }

    console.log('[AudioPlayer] playRandom →', point.audioFile)
    await this.play(point)
  }

  private cleanup() {
    this.isPlaying = false
    this.activePlayer = null
    this.activeAudioKey = null
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }
}

const audioPlayer = AudioPlayer.instance
export { audioPlayer }
