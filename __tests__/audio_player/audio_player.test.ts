import palenicaWlosienicaPoints from '@providers/json/palenica_włosienica.json'
import { TGeoPoint } from '@providers/location_dataset'

jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn(),
    duration: 2, // 2 seconds
  })),
}))

jest.mock('expo-file-system', () => ({
  bundleDirectory: '',
  getInfoAsync: jest.fn(async () => ({ exists: true })),
}))

const LOCATIONS: TGeoPoint[] = palenicaWlosienicaPoints.map((point) => ({
  id: point.id,
  latitude: point.latitude,
  longitude: point.longitude,
  radius: point.radius,
  audioFile: point.audioFile,
}))

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
  jest.useFakeTimers()
})

describe('AudioPlayer', () => {
  it('plays an audio file and handles queue', async () => {
    const { audioPlayer } = require('@services/audio_player')
    await audioPlayer.configure(LOCATIONS)

    await audioPlayer.play(LOCATIONS[0])

    const { createAudioPlayer } = require('expo-audio')
    const player = createAudioPlayer.mock.results[0].value

    expect(player.seekTo).toHaveBeenCalledWith(0)
    expect(player.play).toHaveBeenCalled()

    jest.advanceTimersByTime(2000)
  })

  it('skips playback if file is missing', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation()

    const { audioPlayer } = require('@services/audio_player')
    await audioPlayer.configure(LOCATIONS)

    await audioPlayer.play({
      id: 'missing',
      latitude: 0,
      longitude: 0,
      radius: 100,
      audioFile: 'missing.mp3',
    })

    expect(warnSpy).toHaveBeenCalledWith('[AudioPlayer] Audio file not found for: missing.mp3')
    warnSpy.mockRestore()
  })

  it('reuses audio player instances', async () => {
    const { audioPlayer } = require('@services/audio_player')
    await audioPlayer.configure(LOCATIONS)

    await audioPlayer.play(LOCATIONS[0])
    await audioPlayer.play(LOCATIONS[0])

    const { createAudioPlayer } = require('expo-audio')
    expect(createAudioPlayer).toHaveBeenCalledTimes(1)
  })
})
