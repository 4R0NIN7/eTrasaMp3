import rawPoints from '@providers/points.json'

type TGeoPoint = {
  id: string
  latitude: number
  longitude: number
  radius: number
  audioFile: string
}

const LOCATIONS: TGeoPoint[] = rawPoints.map((point) => ({
  id: point.id,
  latitude: point.latitude,
  longitude: point.longitude,
  radius: point.radius,
  audioFile: point.audioFile,
}))

const ASSETS_FOLDER_PATH = '../assets/audio' as const

const STATIC_AUDIO_REQUIRE_MAP: Record<string, number> = {
  'TPN BUS_[Zakopane].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Zakopane].mp3`),
  'TPN BUS_[Dolina Białki].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Dolina Białki].mp3`),
  'TPN BUS_[Magda].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Magda].mp3`),
  'TPN BUS_[martwy las].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[martwy las].mp3`),
  'TPN BUS_[spor o morskie oko].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[spor o morskie oko].mp3`),
  'TPN BUS_[Wanta].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Wanta].mp3`),
  'TPN BUS_[Włosienica].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Włosienica].mp3`),
  'TPN BUS_[Wodogrzmoty].mp3': require(`${ASSETS_FOLDER_PATH}/TPN BUS_[Wodogrzmoty].mp3`),
} as const

export { TGeoPoint as GeoPoint, LOCATIONS, STATIC_AUDIO_REQUIRE_MAP }
