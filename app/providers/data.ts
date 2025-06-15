type GeoPoint = {
  id: string
  latitude: number
  longitude: number
  radius: number
  mp3: string
}

const LOCATIONS: GeoPoint[] = [
  {
    id: 'dom',
    latitude: 49.29320984635581,
    longitude: 19.93381919559277,
    radius: 50,
    mp3: 'dom.mp3',
  },
  {
    id: 'samanta',
    latitude: 49.29190875378948,
    longitude: 19.947841404421315,
    radius: 50,
    mp3: 'samanta.mp3',
  },
  {
    id: 'rajski',
    latitude: 49.29049538196424,
    longitude: 19.90586585071659,
    radius: 50,
    mp3: 'rajski.mp3',
  },
  {
    id: 'kuznice',
    latitude: 49.27123366643419,
    longitude: 19.981964478998158,
    radius: 50,
    mp3: 'kuznice.mp3',
  },
  {
    id: 'sanktuarium',
    latitude: 49.291274154234145, 
    longitude: 19.924708663577178,
    radius: 50,
    mp3: 'sanktuarium.mp3',
  },
  {
    id: 'cep',
    latitude: 49.284944348720515,
    longitude: 19.971875265969203,
    radius: 50,
    mp3: 'cep.mp3',
  },
]

const AUDIO_MAP: Record<string, number> = {
  'dom.mp3': require('../assets/audio/dom.mp3'),
  'samanta.mp3': require('../assets/audio/samanta.mp3'),
  'rajski.mp3': require('../assets/audio/rajski.mp3'),
  'kuznice.mp3': require('../assets/audio/kuznice.mp3'),
  'sanktuarium.mp3': require('../assets/audio/sanktuarium.mp3'),
  'cep.mp3': require('../assets/audio/cep.mp3'),
}

export { AUDIO_MAP, GeoPoint, LOCATIONS }
