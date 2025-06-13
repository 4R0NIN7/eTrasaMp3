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
    latitude: 49.29190875378948,
    longitude: 19.947841404421315,
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

export { GeoPoint, LOCATIONS }
