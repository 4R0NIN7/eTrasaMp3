import { TGeoPoint } from '@providers/location_dataset'
import { STATIC_AUDIO_REQUIRE_MAP } from '@providers/media_file_dataset'
import { createAudioPlayer } from 'expo-audio'

class AudioPlayer {
  private static _instance: AudioPlayer
  private playerMap = new Map<string, ReturnType<typeof createAudioPlayer>>()
  private queue: TGeoPoint[] = []
  private isPlaying = false
  private audioMap: Record<string, number> = {}

  private constructor() {}

  static get instance(): AudioPlayer {
    if (!this._instance) {
      this._instance = new AudioPlayer()
    }
    return this._instance
  }

  async configure(locations: TGeoPoint[]) {
    this.audioMap = {}
    locations.forEach((point) => {
      const audio = STATIC_AUDIO_REQUIRE_MAP[point.audioFile]
      if (audio) {
        console.log(`[AudioPlayer] Found audio ${audio} for: ${point.audioFile} in ${locations}`)
        this.audioMap[point.audioFile] = audio
      } else {
        console.warn(`[AudioPlayer] Missing audio for: ${point.audioFile} ${locations}`)
      }
    })
  }

  async play(point: TGeoPoint) {
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
