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

const ASSETS_FOLDER_PATH = '../assets/audio/' as const

const AUDIO_MAP: Record<string, number> = {
  'dom.mp3': require(`${ASSETS_FOLDER_PATH}dom.mp3`),
  'samanta.mp3': require(`${ASSETS_FOLDER_PATH}samanta.mp3`),
  'rajski.mp3': require(`${ASSETS_FOLDER_PATH}rajski.mp3`),
  'kuznice.mp3': require(`${ASSETS_FOLDER_PATH}kuznice.mp3`),
  'sanktuarium.mp3': require(`${ASSETS_FOLDER_PATH}sanktuarium.mp3`),
  'cep.mp3': require(`${ASSETS_FOLDER_PATH}cep.mp3`),

  'TPN BUS_[Zakopane].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[Zakopane].mp3`),
  'TPN BUS_[Dolina Białki].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[Dolina Białki].mp3`),
  'TPN BUS_[Magda].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[Magda].mp3`),
  'TPN BUS_[martwy las].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[martwy las].mp3`),
  'TPN BUS_[spor O morskie oko).mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[spor o morskie oko].mp3`),
  'TPN BUS_[Wanta].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[Wanta].mp3`),
  'TPN BUS_[Włosienica].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[Włosienica].mp3`),
  'TPN BUS_[Wodogrzmoty].mp3': require(`${ASSETS_FOLDER_PATH}TPN BUS_[Wodogrzmoty].mp3`),
}

export { AUDIO_MAP, TGeoPoint as GeoPoint, LOCATIONS }
