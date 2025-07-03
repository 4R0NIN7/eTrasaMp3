import { NearbyLocation } from '@organisms/nearby_locations'
import { render } from '@testing-library/react-native'
import React from 'react'

jest.mock('@hooks/use_nearby_location', () => ({
  useNearbyLocation: jest.fn(),
}))

jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(() => ({
    play: jest.fn(),
    seekTo: jest.fn(),
    duration: 1,
  })),
}))

jest.mock('react-native-background-geolocation', () => {
  return {
    __esModule: true,
    default: {
      on: jest.fn(),
      ready: jest.fn((_, callback) => callback({ enabled: true })),
      start: jest.fn(),
      addGeofence: jest.fn(() => Promise.resolve()),
      removeGeofences: jest.fn(() => Promise.resolve()),
    },
    Geofence: jest.fn(),
  }
})

const mockUseNearbyLocation = (value: any) => {
  const hook = require('@hooks/use_nearby_location')
  hook.useNearbyLocation.mockReturnValue(value)
}

describe('<NearbyLocation />', () => {
  it('shows loader when position is not available', () => {
    mockUseNearbyLocation({ position: null, nearbyPoint: null })

    const { getByText } = render(<NearbyLocation />)

    expect(getByText('Getting your position...')).toBeTruthy()
  })

  it('renders location list and user coordinates when nearbyPoint is null', () => {
    mockUseNearbyLocation({
      position: { latitude: 49.2, longitude: 20.1 },
      nearbyPoint: null,
    })

    const { getByText } = render(<NearbyLocation />)

    expect(getByText('All Known Locations')).toBeTruthy()
    expect(getByText('Your Current Position')).toBeTruthy()
    expect(getByText(/Latitude:/)).toBeTruthy()
    expect(getByText(/Longitude:/)).toBeTruthy()
  })

  it('highlights the closest location', () => {
    mockUseNearbyLocation({
      position: { latitude: 49.2, longitude: 20.1 },
      nearbyPoint: {
        id: 'Zakopane',
        latitude: 49.25,
        longitude: 20.1,
        radius: 50,
        audioFile: 'xyz.mp3',
      },
    })

    const { queryAllByText } = render(<NearbyLocation />)

    const flags = queryAllByText(/🚩/)
    expect(flags.length).toBeGreaterThan(0)
  })

  it('passes correct props to LocationList', () => {
    const mockPosition = { latitude: 49.2, longitude: 20.1 }
    const mockNearbyPoint = {
      id: 'Zakopane',
      latitude: 49.25,
      longitude: 20.1,
      radius: 100,
      audioFile: 'xyz.mp3',
    }

    mockUseNearbyLocation({
      position: mockPosition,
      nearbyPoint: mockNearbyPoint,
    })

    const { getByText } = render(<NearbyLocation />)

    expect(getByText(/All Known Locations/)).toBeTruthy()
  })

  it('handles invalid nearbyPoint gracefully', () => {
    mockUseNearbyLocation({
      position: { latitude: 49.2, longitude: 20.1 },
      nearbyPoint: { id: 'bad', latitude: NaN, longitude: NaN, radius: 0, audioFile: '' },
    })

    const { getByText } = render(<NearbyLocation />)
    expect(getByText('Your Current Position')).toBeTruthy()
  })
})
